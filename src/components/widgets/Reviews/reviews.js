import React, { Component } from "react";
import { GetReviewsByStayIdRepository, AddReviewRepository } from "../../../repository/stay";
import { withTranslation } from "react-i18next";
import style from './reviews.css'
import { IsUserLogged } from "../../../repository/user";
import 'font-awesome/css/font-awesome.min.css';

class Rewiews extends Component {
    defaultPageSize = 4;

    state = {
        reviews: [],
        newReview: {
            stayId: this.props.stayId,
            message: "",
            rating: "5"
        },
        pageNumber: 0,
        pageSize: this.props.pageSize || this.defaultPageSize,
        endLoading: false,
        renderAddReview: true
    };

    getReviews = () => {
        GetReviewsByStayIdRepository(this.props.stayId, this.state.pageNumber, this.state.pageSize)
            .then(response => response.json())
            .then(reviews => {
                this.setState({ reviews: reviews });
                if (reviews.length < this.state.pageSize) {
                    this.setState({ endLoading: true })
                }
            })
            .catch((err) => { console.log(err) })

        if (this.state.renderAddReview && !IsUserLogged()) {
            this.setState({ renderAddReview: false });
        }
    }

    componentDidMount() {
        this.getReviews()
    }

    renderMoreHandler = () => {
        GetReviewsByStayIdRepository(this.props.stayId, this.state.pageNumber + 1, this.state.pageSize)
            .then(response => response.json())
            .then(reviews => {
                this.setState({ reviews: [...this.state.reviews, ...reviews], pageNumber: this.state.pageNumber + 1 });
                if (reviews.length < this.state.pageSize)
                    this.setState({ endLoading: true })
            })
            .catch((err) => { console.log(err) })
    };

    renderMore() {
        const { t } = this.props;
        return (
            <button onClick={this.renderMoreHandler} className={style.showMore}>
                {t("SHOW_MORE")}
            </button>
        );
    }

    renderReview() {
        return (
            <div className={style.reviews}>
                {this.state.reviews && this.state.reviews.map((item, i) => (
                    <div className={style.review} key={i}>
                        <div className={style.user}>{item.userId}</div>
                        <div className={style.message}>
                            <i className={"fa fa-quote-left"}></i>
                            {item.message}
                            <i className={"fa fa-quote-right"}></i>
                        </div>
                        <div className={style.rating}><strong>{item.rating}</strong> / 5 </div>
                    </div>
                ))}
            </div>
        )
    }

    inputHandler(event, field) {
        const temp = {
            ...this.state.newReview,
        };
        temp[field] = event.target.value;

        this.setState({
            newReview: temp
        });
    }

    submitReview = () => {
        AddReviewRepository(this.state.newReview)
            .then(response => {
                this.setState({
                    renderAddReview: false,
                    endLoading: false,
                })

                this.getReviews()
            })
            .catch((err) => {
                console.log(err);
            })

    }

    renderAddReview = () => {
        const { t } = this.props
        return (
            <div className={style.addReview}>
                <textarea onChange={event => this.inputHandler(event, "message")} placeholder={t('ADD_REVIEW_PLACEHOLDER')} value={this.state.newReview.message}></textarea>
                <select onChange={(event) => this.inputHandler(event, "rating")}
                    value={this.state.newReview.rating}>
                    <option value="1">★</option>
                    <option value="2">★★</option>
                    <option value="3">★★★</option>
                    <option value="4">★★★★</option>
                    <option value="5">★★★★★</option>
                </select>
                <button onClick={this.submitReview}>{t('ADD_REVIEW')}</button>
            </div>
        )
    }

    render() {
        return <div className={style.reviewsComponent}>
            {this.renderReview()}
            {!this.state.endLoading ? this.renderMore() : null}
            {this.state.renderAddReview ? this.renderAddReview() : null}
        </div>;
    }
}
export default withTranslation()(Rewiews)

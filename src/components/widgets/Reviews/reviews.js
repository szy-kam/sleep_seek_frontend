import React, { Component } from "react";
import { GetReviewsByStayIdRepository, AddReviewRepository } from "../../../repository/stay";
import { withTranslation } from "react-i18next";
import style from './reviews.css'
import { IsUserLogged } from "../../../repository/user";

class Rewiews extends Component {
    defaultPageSize = 3;

    state = {
        reviews: [],
        newReview: {
            stayId: this.props.stayId,
            message: "",
            rating: ""
        },
        pageNumber: 0,
        pageSize: this.props.pageSize || this.defaultPageSize,
        endLoading: false,
        renderAddReview: true
    };

    componentDidMount() {
        GetReviewsByStayIdRepository(this.props.stayId, this.state.pageNumber, this.state.pageSize)
            .then(response => response.json())
            .then(reviews => {
                this.setState({ reviews: reviews });
                if (reviews.length < this.state.pageSize) {
                    this.setState({ endLoading: true })
                }
            })
            .catch((err) => { console.log(err) })
        
        if(this.state.renderAddReview && !IsUserLogged()){
            this.setState({ renderAddReview: false });
        }
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
                        <div className={style.message}>"{item.message}"</div>
                        <div className={style.rating}>{item.rating}</div>
                    </div>
                ))}
            </div>
        )
    }

    textareHandler(event) {
        const temp = {
            ...this.state.newReview,
        };
        temp["message"] = event.target.value;

        this.setState({
            newReview: temp
        });
    }

    submitReview = () => {
        AddReviewRepository(this.state.newReview)
            .then(response => console.log(response))
            .catch((err) => {
                console.log(err);
            })

        this.setState({
            renderAddReview: false
        })
        this.renderMoreHandler();

    }

    renderAddReview = () => {
        const { t } = this.props
        return (
            <div className={style.addReview}>
                <textarea onChange={event => this.textareHandler(event)} placeholder={t('ADD_REVIEW_PLACEHOLDER')} value={this.state.newReview.message}></textarea>
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

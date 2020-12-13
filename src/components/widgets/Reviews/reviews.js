import React, { Component } from "react";
import { GetReviewsByStayIdRepository, AddReviewRepository } from "../../../repository/stay";
import { withTranslation } from "react-i18next";
import style from './reviews.css'

class Rewiews extends Component {
    defaultPageSize = 1;

    state = {
        reviews: [],
        newReview: {
            stayId: this.props.stayId,
            message: "",
        },
        pageNumber: 0,
        pageSize: this.props.pageSize || this.defaultPageSize,
        endLoading: false
    };

    componentDidMount() {
        GetReviewsByStayIdRepository(this.state.stayId, this.state.pageNumber, this.state.pageSize)
            .then((response) => {
                this.setState({ reviews: response });
                if (response.length < this.state.pageSize) {
                    this.setState({ endLoading: true })
                }
            })
            .catch((err) => { console.log(err) })
    }

    renderMoreHandler = () => {
        GetReviewsByStayIdRepository(this.state.stayId, this.state.pageNumber, this.state.pageSize).then((response) => {
            this.setState({ reviews: [...this.state.reviews, ...response], pageNumber: this.state.pageSize + 1 });
            if (response.length < this.state.pageSize) this.setState({ endLoading: true })
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
            .then() //TODO
            .catch((err) => {
                console.log(err);
            })
        this.forceUpdate();
    }

    renderAddReview = () => {
        const { t } = this.props
        return (
            <div className={style.addReview}>
                <textarea onChange={event => this.textareHandler(event)} placeholder={t('ADD_REVIEW_PLACEHOLDER')}></textarea>
                <button onClick={this.submitReview}>{t('ADD_REVIEW')}</button>
            </div>
        )
    }

    render() {
        return <div className={style.reviewsComponent}>
            {this.renderReview()}
            {!this.state.endLoading ? this.renderMore() : null}
            {this.renderAddReview()}
        </div>;
    }
}
export default withTranslation()(Rewiews)

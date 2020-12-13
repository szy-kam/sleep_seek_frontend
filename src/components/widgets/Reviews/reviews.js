import React, { Component } from "react";
import {GetReviewsByStayIdRepository} from "../../../repository/stay";
import { withTranslation } from "react-i18next";

class Rewiews extends Component {
    defaultPageSize = 5;

    state = {
        review: {
            id: null,
            stayId: null,
            userId: null,
            message: "",
            rating: null,
        },
        stayId: this.props.stayId,
        pageNumber: 0,
        pageSize: this.props.pageSize || this.defaultPageSize,
        endLoading: false
    };

    componentDidMount() {
        GetReviewsByStayIdRepository(this.state.stayId, this.state.pageNumber, this.state.pageSize)
        .then((response) => {
            this.setState({ review: response });
            if(response.length < this.state.pageSize) {
                this.setState({ endLoading: true })
            }
        })
        .catch((err) => { console.log(err) })
    }

    renderMoreHandler = () => {
        GetReviewsByStayIdRepository(this.stay.stayId, this.stay.pageNumber, this.stay.pageSize).then((response) => {this.setState({ stays: [...this.state.stays, ...response], pageNumber: this.state.pageSize + 1 });
            if (response.length < this.state.pageSize) this.setState({ endLoading: true })})
        .catch((err) => { console.log(err) })
    };

    renderMore() {
        const { t } = this.props;
        return (
            <button onClick={this.renderMoreHandler}>
                {t("SHOW_MORE")}
            </button>
        );
    }

    renderReview(){
        return (
            <div>
                Review
            </div>
        )
    }

    render() {
        return <div>
            {this.props.loadMore && !this.state.endLoading ? this.renderMore() : null}
        </div>;
    }
}
export default withTranslation()(Rewiews)

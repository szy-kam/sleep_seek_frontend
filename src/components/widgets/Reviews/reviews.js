import React, { Component } from "react";
import {GetReviewsByStayIdRepository} from "../../../repository/stay";
import { withTranslation } from "react-i18next";

class Rewiews extends Component {
    defaultPageSize = 5;

    state = {
        reviews: [],
        stayId: this.props.stayId,
        pageNumber: 0,
        pageSize: this.props.pageSize || this.defaultPageSize,
        endLoading: false
    };

    componentDidMount() {
        GetReviewsByStayIdRepository(this.state.stayId, this.state.pageNumber, this.state.pageSize)
        .then((response) => {
            this.setState({ reviews: response });
            if(response.length < this.state.pageSize) {
                this.setState({ endLoading: true })
            }
        })
        .catch((err) => { console.log(err) })
    }

    renderMoreHandler = () => {
        GetReviewsByStayIdRepository(this.state.stayId, this.state.pageNumber, this.state.pageSize).then((response) => {this.setState({ reviews: [...this.state.stays, ...response], pageNumber: this.state.pageSize + 1 });
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
                {this.state.reviews && this.state.reviews.map((item, i) => ( 
                    item.message
                ))}
            </div>
        )
    }

    render() {
        return <div>
            {this.renderReview()}
            {!this.state.endLoading ? this.renderMore() : null}
        </div>;
    }
}
export default withTranslation()(Rewiews)

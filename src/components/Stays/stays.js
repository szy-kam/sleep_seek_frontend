import React, { Component } from "react";
import StaysCard from "../widgets/StaysCards/staysCard";
import { GetStaysWithParamsRepository } from "../../repository/stays";
import style from "./stays.css";
import AdvancedSearchForm from "../AdvancedSearchForm/advancedSearchForm";

class Stays extends Component {
    defaultStaysQuantity = 3;

    state = {
        stays: [],
        page: 0,
        pageSize: this.defaultStaysQuantity,
        loadMore: true,
        searchParmas: null
    };

    componentDidMount() {
        GetStaysWithParamsRepository(this.state.page, this.state.pageSize, this.state.searchParams)
            .then((response) => {
                this.setState({ stays: response })
                if (response.length < this.state.pageSize) this.setState({ loadMore: false });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    renderMoreHandler = () => {
        GetStaysWithParamsRepository(this.state.page + 1, this.state.pageSize, this.state.searchParams)
            .then((response) => {
                this.setState({ stays: [...this.state.stays, ...response], page: this.state.page + 1 });
                if (response.length < this.state.pageSize) this.setState({ loadMore: false });
            });
    };

    handleSearchSubmit = (searchParams) => {
        this.setState({ stays: [], page: 0, loadMore: true, searchParams: searchParams });
        GetStaysWithParamsRepository(this.state.page, this.state.pageSize, searchParams)
            .then((response) => {
                this.setState({ stays: response })
                if (response.length < this.state.pageSize) this.setState({ loadMore: false });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className={style.staysComponent}>
                <div className={style.leftColumn}>
                    <AdvancedSearchForm handleSubmit={this.handleSearchSubmit} />
                    <StaysCard template="mini" loadMore={false} />
                </div>

                <StaysCard template="default" loadMore={this.state.loadMore} stays={this.state.stays} renderMoreHandler={this.renderMoreHandler} />
            </div>
        );
    }
}

export default Stays;

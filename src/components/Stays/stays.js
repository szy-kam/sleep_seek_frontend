import React, { Component } from "react";
import StaysCard from "../widgets/StaysCards/staysCard";
import { GetStaysWithParamsRepository } from "../../repository/stays";
import style from "./stays.css";
import AdvancedSearchForm from "../AdvancedSearchForm/advancedSearchForm";
import StaysMap from "../widgets/StaysMap/staysMap";
import { withTranslation } from "react-i18next";

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
            .then(response => response.json())
            .then(data => {
                this.setState({ stays: data })
                if (data.length < this.state.pageSize) this.setState({ loadMore: false });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    renderMoreHandler = () => {
        GetStaysWithParamsRepository(this.state.page + 1, this.state.pageSize, this.state.searchParams)
            .then(response => response.json())
            .then(data => {
                this.setState({ stays: [...this.state.stays, ...data], page: this.state.page + 1 });
                if (data.length < this.state.pageSize) this.setState({ loadMore: false });
            });
    };

    handleSearchSubmit = (searchParams) => {
        this.setState({ stays: [], page: 0, loadMore: true, searchParams: searchParams });
        GetStaysWithParamsRepository(this.state.page, this.state.pageSize, searchParams)
            .then(response => response.json())
            .then(data => {
                this.setState({ stays: data })
                if (data.length < this.state.pageSize) this.setState({ loadMore: false });
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
                <div className={style.middleColumn}>
                    <StaysCard template="default" loadMore={this.state.loadMore} stays={this.state.stays} renderMoreHandler={this.renderMoreHandler} />
                </div>
                <div className={style.rightColumn}>
                    <StaysMap stays={this.state.stays} position={[52.125736, 19.080392]} zoom={6} height="500px" />
                </div>
            </div>
        );
    }
}

export default withTranslation()(Stays);

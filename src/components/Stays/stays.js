import React, { Component } from "react";
import StaysCard from "../widgets/StaysCards/staysCard";
import { GetStaysWithParamsRepository } from "../../repository/stays";
import style from "./stays.css";
import AdvancedSearchForm from "../AdvancedSearchForm/advancedSearchForm";
import StaysMap from "../widgets/StaysMap/staysMap";
import { withTranslation } from "react-i18next";
import { OpenStreetMapProvider } from "leaflet-geosearch";

class Stays extends Component {
    defaultStaysQuantity = 3;

    state = {
        stays: [],
        pageNumber: 0,
        pageSize: this.defaultStaysQuantity,
        loadMore: true,
        searchParams: null,
        mapPosition: [52.125736, 19.080392],
        mapZoom: 6
    };

    componentDidMount() {
        GetStaysWithParamsRepository(this.state.pageNumber, this.state.pageSize, this.state.searchParams)
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
        GetStaysWithParamsRepository(this.state.pageNumber + 1, this.state.pageSize, this.state.searchParams)
            .then(response => response.json())
            .then(data => {
                this.setState({ stays: [...this.state.stays, ...data], page: this.state.pageNumber + 1 });
                if (data.length < this.state.pageSize) this.setState({ loadMore: false });
            });
    };

    getCordsFromAddress = async (address) => {
        let mapPosition = null
        if (address.length > 5) {
            const provider = new OpenStreetMapProvider();
            await provider.search({ query: address })
                .then((result) => {
                    if (result.length > 0) {
                        mapPosition = [result[0].y, result[0].x];
                        this.setState({
                            mapPosition: mapPosition,
                            mapZoom: 12
                        });
                    }
                });
        }
        return mapPosition

    }

    handleSearchSubmit = async (searchParams) => {
        // this.setState({ stays: [], page: 0, loadMore: true, searchParams: searchParams })
        const address =
            searchParams.city +
            " " +
            searchParams.country

        searchParams.coordinates = await this.getCordsFromAddress(address);

        GetStaysWithParamsRepository(this.state.pageNumber, this.state.pageSize, searchParams)
            .then(response => response.json())
            .then(data => {
                this.setState({ stays: data, page: 0, loadMore: true, searchParams: searchParams })
                if (data.length < this.state.pageSize) this.setState({ loadMore: false });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        console.log(this.state);
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
                    <StaysMap stays={this.state.stays} position={this.state.mapPosition} zoom={this.state.mapZoom} height="500px" />
                </div>
            </div>
        );
    }
}

export default withTranslation()(Stays);

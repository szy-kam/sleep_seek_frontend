import React, { Component } from "react";
import StaysCard from "../../widgets/StaysCards/staysCard";
import { GetStaysWithParamsRepository } from "../../../repository/stays";
import style from "./stays.css";
import AdvancedSearchForm from "../../AdvancedSearchForm/advancedSearchForm";
import StaysMap from "../../widgets/StaysMap/staysMap";
import { withTranslation } from "react-i18next";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import LoadingComponent from "../../widgets/LoadingComponent/loadingComponent";

class Stays extends Component {
    defaultStaysQuantity = 10;

    state = {
        stays: [],
        pageNumber: 0,
        pageSize: this.defaultStaysQuantity,
        loadMore: true,
        searchParams: null,
        mapPosition: [52.125736, 19.080392],
        mapZoom: 6,
        isLoading: true
    };

    componentDidMount() {
        GetStaysWithParamsRepository(this.state.pageNumber, this.state.pageSize, this.state.searchParams)
            .then(response => {
                if (response.ok)
                    return response.json()
                else return []
            })
            .then(data => {
                this.setState({ stays: data, isLoading: false })
                if (data.length < this.state.pageSize) this.setState({ loadMore: false });
            })
            .catch((err) => {
                this.setState({ isLoading: false })
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

    // approximate distance in km to degree
    distanceCalculation = (distance, coordinates) => {
        let latTraveledDeg = (1 / 110.574) * distance

        const currentLat = coordinates[0]
        const longTraveledDeg = (1 / (111.319 * Math.cos(currentLat))) * distance;
        console.log([latTraveledDeg, longTraveledDeg]);
        //TODO
    }

    //Save coords from address in state and repositon map
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

        if (searchParams.city) {
            searchParams.coordinates = await this.getCordsFromAddress(searchParams.city + " " + searchParams.country);
            this.distanceCalculation(searchParams.maxDistance, searchParams.coordinates)
        }

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
        return (
            <div className={style.staysComponent}>
                <div className={style.leftColumn}>
                    <AdvancedSearchForm handleSubmit={this.handleSearchSubmit} />
                </div>
                <div className={style.middleColumn}>
                    {!this.state.isLoading ? <StaysCard template="default" loadMore={this.state.loadMore} stays={this.state.stays} renderMoreHandler={this.renderMoreHandler} /> : <LoadingComponent />}
                    <StaysMap stays={this.state.stays} position={this.state.mapPosition} zoom={this.state.mapZoom} height="500px" />
                </div>

            </div>
        );
    }
}

export default withTranslation()(Stays);

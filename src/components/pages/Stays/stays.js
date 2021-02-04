import React, { Component } from "react";
import StaysCard from "../../widgets/StaysCards/staysCard";
import { GetStaysWithParamsRepository } from "../../../repository/stays";
import style from "./stays.css";
import AdvancedSearchForm from "../../AdvancedSearchForm/advancedSearchForm";
import StaysMap from "../../widgets/StaysMap/staysMap";
import { withTranslation } from "react-i18next";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import LoadingComponent from "../../widgets/LoadingComponent/loadingComponent";
import { connect } from "react-redux";
import { dateRangeChange } from "../../../redux/stay/stayActions";

class Stays extends Component {
    defaultStaysQuantity = 20;

    state = {
        stays: [],
        pageNumber: 0,
        pageSize: this.defaultStaysQuantity,
        loadMore: true,
        searchParams: null,
        mapPosition: [52.125736, 19.080392],
        mapZoom: 6,
        isLoading: true,
        mapBounds: null
    };

    getStays = () => {
        GetStaysWithParamsRepository(this.state.pageNumber, this.state.pageSize, this.state.searchParams)
            .then(response => {
                if (response.ok)
                    return response.json()
                else return []
            })
            .then(data => {
                this.setState({ stays: data, isLoading: false })
                if (this.state.searchParams) this.setState({ searchParams: null });
                if (data.length < this.state.pageSize) this.setState({ loadMore: false });
            })
            .catch((err) => {
                console.log(err);
                this.setState({ isLoading: false })
            });
    }

    componentDidMount() {
        this.getStays()
    }

    renderMoreHandler = () => {
        GetStaysWithParamsRepository(this.state.pageNumber + 1, this.state.pageSize, this.state.searchParams)
            .then(response => response.json())
            .then(data => {
                this.setState({ stays: [...this.state.stays, ...data], pageNumber: this.state.pageNumber + 1 });
                if (data.length < this.state.pageSize) this.setState({ loadMore: false });
            });
    };

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
        this.setState({ stays: [], pageNumber: 0, loadMore: true, searchParams: searchParams, isLoading: true })

        if (searchParams && searchParams.city) {
            await this.getCordsFromAddress(searchParams.city + " " + searchParams.country);

            if (searchParams.lookNearby) {
                searchParams.southWestLatitude = this.state.mapBounds._southWest.lat
                searchParams.southWestLongitude = this.state.mapBounds._southWest.lng
                searchParams.northEastLatitude = this.state.mapBounds._northEast.lat
                searchParams.northEastLongitude = this.state.mapBounds._northEast.lng
            }

        }
        searchParams.lookNearby = ""
        GetStaysWithParamsRepository(this.state.pageNumber, this.state.pageSize, searchParams)
            .then(response => {
                if (response.ok)
                    return response.json()
                else return []
            })
            .then(data => {
                this.setState({ stays: data, pageNumber: 0, loadMore: true, searchParams: searchParams, isLoading: false })
                if (data.length < this.state.pageSize) this.setState({ loadMore: false });
            })
            .catch((err) => {
                console.log(err);
                this.setState({ isLoading: false })
            });
    }

    handleBounds = (bounds) => {
        if (JSON.stringify(this.state.mapBounds) !== JSON.stringify(bounds)) {
            this.setState({ mapBounds: bounds })
        }
    }

    render() {
        return (
            <div className={style.staysComponent}>
                <div className={style.leftColumn}>
                    <AdvancedSearchForm handleSubmit={this.handleSearchSubmit} />
                </div>
                <div className={style.middleColumn}>
                    {!this.state.isLoading ? <StaysCard template="default" loadMore={this.state.loadMore} stays={this.state.stays} renderMoreHandler={this.renderMoreHandler} /> : <LoadingComponent />}
                    <StaysMap stays={this.state.stays} position={this.state.mapPosition} zoom={this.state.mapZoom} height="500px" bounds={this.handleBounds} />
                </div>

            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    dateRangeChange: (dateRange) => dispatch(dateRangeChange(dateRange)),
})

const mapStateToProps = state => ({
    dateRange: state.stay.dateRange
})

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Stays));


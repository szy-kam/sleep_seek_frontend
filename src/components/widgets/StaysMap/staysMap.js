import React, { Component } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Link } from "react-router-dom";
import { GetStaysRepository } from '../../../repository/stays'
require("react-leaflet-markercluster/dist/styles.min.css");

class StaysMap extends Component {
    defaultHeight = "450px";
    defaultZoom = 6;
    defaultPosition = [52.125736, 19.080392]; // geometric center of Poland
    defaultQuantity = 50;

    state = {
        stays: this.props.stays || [],
        position: this.props.position || this.defaultPosition,
        zoom: this.props.zoom || this.defaultZoom
    }

    height = this.props.height || this.defaultHeight;

    componentDidMount = () => {
        if (!this.props.stays) {
            GetStaysRepository(0, this.defaultQuantity)
                .then(response => this.setState({ stays: response }))
                .catch(err => console.log(err))
        }

    }

    componentDidUpdate = (prevProps) => {
        if (prevProps !== this.props) {
            this.setState({ stays: this.props.stays })
        }
    }


    markers = () => {
        if (this.state.stays) {
            return this.state.stays.map((item, i) => {
                if (item.address.latitude)
                    return (
                        <Marker position={[item.address.latitude, item.address.longitude]} key={i}>
                            <Popup>
                                <div>
                                    <Link to={`/stays/${item.id}`}><img src={item.mainPhoto} alt={item.name} height="100px" width="auto" /></Link>
                                    <Link to={`/stays/${item.id}`}><p>{item.name}</p></Link>
                                </div>
                            </Popup>
                        </Marker>
                    )
                else
                    return null
            })
        }
        else return null
    }

    CentreMap = () => {
        const map = useMap();
        map.setView(this.props.position, this.props.zoom);
        return null;
    }

    render() {
        return (
            <MapContainer
                center={this.state.position}
                zoom={this.state.zoom}
                scrollWheelZoom={false}
                style={{
                    height: this.height,
                }}
            >
                <this.CentreMap />
                <TileLayer
                    url='https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png'
                    attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                />
                {/* <TileLayer
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                /> */}
                <MarkerClusterGroup>{this.markers()}</MarkerClusterGroup>
            </MapContainer>
        );
    }

};

export default StaysMap;

import React, { Component } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Link } from "react-router-dom";
import { GetStaysRepository } from '../../../repository/stays'
require("react-leaflet-markercluster/dist/styles.min.css");

class StaysMap extends Component {
    state = {
        stays: this.props.stays || []
    }

    defaultHeight = "450px";
    defaultZoom = 6;
    defaultPosition = [52.125736, 19.080392]; // geometric center of Poland

    position = this.props.position || this.defaultPosition;
    zoom = this.props.zoom || this.defaultZoom;
    height = this.props.height || this.defaultHeight;

    componentDidMount = () => {
        if (!this.props.stays) {
            const defaultQuantity = 50;
            GetStaysRepository(0, defaultQuantity)
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
        if (this.state.stays){
            return this.state.stays.map((item, i) => {
                if (item.address.latitude)
                    return (
                        <Marker position={[item.address.latitude, item.address.longitude]} key={i}>
                            <Popup>
                                <Link to={`/stays/${item.id}`}><img src={item.mainPhoto} alt={item.name}/></Link>
                                <Link to={`/stays/${item.id}`}>{item.name}</Link>
                            </Popup>
                        </Marker>
                    )
                else
                    return null
            })
        }
        else return null
    }

    render() {
        return (
            <MapContainer
                center={this.position}
                zoom={this.zoom}
                scrollWheelZoom={false}
                style={{
                    height: this.height,
                }}
            >
                <TileLayer
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <MarkerClusterGroup>{this.markers()}</MarkerClusterGroup>
            </MapContainer>
        );
    }

};

export default StaysMap;

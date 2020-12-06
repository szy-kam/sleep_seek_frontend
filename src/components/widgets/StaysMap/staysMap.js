import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { Link } from "react-router-dom";
require("react-leaflet-markercluster/dist/styles.min.css");

let STAYS = [
    {
        id: 1,
        name: "name1",
        address: {
            city: "",
            street: "",
            zipCode: "",
        },
        mainPhoto: "",
        description: "",
        price: "",
        contactInfo: "",
        photos: [],
        newPhotos: [],
        latitude: 52.125736,
        longitude: 19.080392,
    },
    {
        id: 2,
        name: "name2",
        address: {
            city: "",
            street: "",
            zipCode: "",
        },
        mainPhoto: "",
        description: "",
        price: "",
        contactInfo: "",
        photos: [],
        newPhotos: [],
        latitude: 52.425736,
        longitude: 19.280392,
    },
];

const StaysMap = (props) => {
    const defaultHeight = "450px";
    const defaultZoom = 6;
    const defaultPosition = [52.125736, 19.080392]; // geometric center of Poland

    const position = props.position || defaultPosition;
    const zoom = props.zoom || defaultZoom;
    const height = props.height || defaultHeight;
    const stays = STAYS;

    const markers = () => {
        return stays.map((item, i) => (
            <Marker position={[item.latitude, item.longitude]} key={i}>
                <Popup>
                    <Link to={`/stays/${item.id}`}>{item.name}</Link>
                </Popup>
            </Marker>
        ));
    };

    return (
        <MapContainer
            center={position}
            zoom={zoom}
            minZoom={5}
            scrollWheelZoom={false}
            style={{
                height: height,
            }}
        >
            <TileLayer
                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <MarkerClusterGroup>{markers()}</MarkerClusterGroup>
        </MapContainer>
    );
};

export default StaysMap;

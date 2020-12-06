import React from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

const StayMap = (props) => {
    const defaultZoom = 13
    const defaultHeight = '300px'
    const position = props.position
    const zoom = props.zoom || defaultZoom 
    return (
        <MapContainer 
            center={position}
            zoom={zoom}
            minZoom={10}
            scrollWheelZoom={false}
            style={{
                height: defaultHeight
            }}
        >
            <TileLayer
                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}></Marker>
        </MapContainer>
    );
};

export default StayMap;

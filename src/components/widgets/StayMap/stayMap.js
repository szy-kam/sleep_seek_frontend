import React from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

const StayMap = (props) => {
    const defaultZoom = 13;
    const defaultHeight = "300px";
    const position = props.position;
    const zoom = props.zoom || defaultZoom;

    function CentreMap() {
        const map = useMap();
        map.setView(props.position, props.zoom);
        return null;
    }

    if (position[0] !== null) {
        return (
            <MapContainer
                center={props.position}
                zoom={zoom}
                scrollWheelZoom={false}
                style={{
                    height: defaultHeight,
                }}
            >
                <CentreMap />
                <TileLayer
                    url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png'
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />
                {/* <TileLayer
                    url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                /> */}
                {/* <TileLayer
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                /> */}
                <Marker position={position}></Marker>
            </MapContainer>
        );
    }
    else {
        return null;
    }

};

export default StayMap;

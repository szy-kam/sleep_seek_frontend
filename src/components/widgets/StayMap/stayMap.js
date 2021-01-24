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
    
    if(position[0] !== null){
        return (
            <MapContainer
                center={props.position}
                zoom={zoom}
                minZoom={10}
                scrollWheelZoom={false}
                style={{
                    height: defaultHeight,
                }}
            >
                <CentreMap />
                <TileLayer
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}></Marker>
            </MapContainer>
        );
    }
    else{
        return null;
    }
    
};

export default StayMap;

import React from "react";
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '400px'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

export default function Map() {
    console.log("hi there", process.env.REACT_APP_MAPS_API_KEY);

    return (
        <LoadScript
            googleMapsApiKey={`${process.env.REACT_APP_MAPS_API_KEY}`}
            libraries={["places"]}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            >
                { /* Child components, such as markers, info windows, etc. */ }
                <></>
            </GoogleMap>
        </LoadScript>
    )
}
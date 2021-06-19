import React from "react";
import {GoogleMap, StandaloneSearchBox} from '@react-google-maps/api';
import { Circle } from '@react-google-maps/api';
import {LoadScript} from "@react-google-maps/api";

const containerStyle = {
    height: "400px",
    width: "400px"
};

const center = {
    lat: 37.09024,
    lng: -95.712891
};

export default function SearchBox() {
    let searchBox;
    const onLoad = (ref) => searchBox = ref;

    const onPlacesChanged = () => {
        let newPlace = searchBox.getPlaces();
        console.log(newPlace[0].geometry.location.lat(), newPlace[0].geometry.location.lng());
    };

    return (
        <LoadScript
            googleMapsApiKey={`${process.env.REACT_APP_MAPS_API_KEY}`}
            libraries={["places"]}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={3}
                clickableIcons={false}
                options={{
                    streetView: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                }}
            >
                <StandaloneSearchBox
                    onLoad={onLoad}
                    onPlacesChanged={onPlacesChanged}
                >
                    <input
                        type="text"
                        placeholder="Search City or Town"
                        style={{
                            boxSizing: `border-box`,
                            border: `1px solid transparent`,
                            width: `280px`,
                            height: `32px`,
                            padding: `8px 18px`,
                            marginTop: '15px',
                            borderRadius: `6px`,
                            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                            fontSize: `16px`,
                            outline: `none`,
                            textOverflow: `ellipses`,
                            position: "absolute",
                            left: "50%",
                            marginLeft: "-120px"
                        }}
                    />
                </StandaloneSearchBox>
                <></>
            </GoogleMap>

        </LoadScript>
    )
}

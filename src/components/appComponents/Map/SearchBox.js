import React from "react";
import {useState, useRef} from "react";
import {GoogleMap, StandaloneSearchBox} from '@react-google-maps/api';
import { Circle } from '@react-google-maps/api';
import {LoadScript} from "@react-google-maps/api";
import {Button} from "@material-ui/core";

const containerStyle = {
    height: "400px",
    width: "100%",
    position: "relative",
    margin: "20px auto",
};

export default function SearchBox(props) {
    const circleRef = useRef(null);
    const [displaySearch, setDisplaySearch] = useState(true);
    const [center, setCenter] = useState({
            lat: 37.09024,
            lng: -95.712891
        });
    const [socialFence, setSocialFence] = useState(false);
    const [radius, setRadius] = useState(10000);
    const [zoom, setZoom] = useState(3);

    let searchBox;
    const onSearchLoad = (ref) => searchBox = ref;
    const onPlacesChanged = (ref) => {
        console.log(searchBox);
        let newPlace = searchBox.getPlaces();
        setCenter({
            lat: newPlace[0].geometry.location.lat(),
            lng: newPlace[0].geometry.location.lng()
        });
        setZoom(10);
        setSocialFence({
            lat: newPlace[0].geometry.location.lat(),
            lng: newPlace[0].geometry.location.lng()
        });
    };

    let circle;
    const onCircleLoad = (ref) => {
        circle = ref;
        console.log(circle);
        setDisplaySearch(false);
        props.onAreaSet();
        props.setLatLng(socialFence);
        props.setRadius(radius);
    };

    const onCenterChanged = () => {
        if (circleRef.current === null) {return};
        let coordinates = {
            lat: circleRef.current.state.circle.lat,
            lng: circleRef.current.state.circle.lng
        }
        setSocialFence(coordinates);
        props.setLatLng(coordinates);
    }

    const onRadiusChanged = () => {
        if (circleRef.current === null) {return}
        setRadius(circleRef.current.state.circle.radius);
        props.setRadius(circleRef.current.state.circle.radius)
    }

    return (
        <LoadScript
            googleMapsApiKey={`${process.env.REACT_APP_MAPS_API_KEY}`}
            libraries={["places"]}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={zoom}
                clickableIcons={false}
                options={{
                    streetView: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false,
                }}
            >
                {displaySearch && <StandaloneSearchBox
                    onLoad={onSearchLoad}
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
                </StandaloneSearchBox>}
                {socialFence && (
                    <Circle
                        ref={circleRef}
                        center={socialFence}
                        radius={radius}
                        editable={true}
                        draggable={false}
                        onLoad={onCircleLoad}
                        onCenterChanged={onCenterChanged}
                        onRadiusChanged={onRadiusChanged}
                        options={{
                            strokeColor: "#004643",
                            strokeOpacity: 0.8,
                            strokeWeight: 1,
                            fillColor: "#004643",
                            fillOpacity: 0.3,
                        }}
                    />
                )}
            </GoogleMap>
            {socialFence && <Button
                color="primary"
                round
                onClick={() => {
                    console.log("Reset")
                    props.onAreaReset();
                    setDisplaySearch(true);
                    setSocialFence(false);
                }
                }>
                Change City
            </Button>}
        </LoadScript>
    )
}

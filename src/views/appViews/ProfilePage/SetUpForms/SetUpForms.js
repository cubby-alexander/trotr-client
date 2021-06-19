import React from "react";
import {useState, useContext} from "react";
import {useHistory} from "react-router-dom";
import ApplicationContext from "../../../../ApplicationContext";
import axios from "axios";
import classNames from "classnames";
import {makeStyles} from "@material-ui/core/styles";
import GridContainer from "../../../../components/Grid/GridContainer";
import GridItem from "../../../../components/Grid/GridItem";
import ImageUpload from "../../../../components/appComponents/CustomUpload/ImageUpload";

import styles from "../profilePageStyle";
import InfoArea from "../../../../components/InfoArea/InfoArea";
import ImportContacts from "@material-ui/icons/ImportContacts";
import {LocationCity} from "@material-ui/icons";
import {Settings} from "@material-ui/icons";
import Button from "../../../../components/appComponents/CustomButtons/Button";
import ProgressBar from "../../../../components/appComponents/ProgressBar/ProgressBar";
import InputAdornment from "@material-ui/core/InputAdornment";
import Email from "@material-ui/icons/Email";
import CustomInput from "../../../../components/appComponents/CustomInput/CustomInput";
import SearchBox from "../../../../components/appComponents/Map/SearchBox";

const useStyles = makeStyles(styles);

export default function SetUpForms(props) {
    const context = useContext(ApplicationContext);
    const history = useHistory();
    const classes = useStyles();
    const [formStage, setFormStage] = useState(0);
    const [avatar, setAvatar] = useState("https://res.cloudinary.com/djipxounx/image/upload/v1624115513/placeholder_bgwuxw.jpg");
    const [phone, setPhone] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [socialFence, setSocialFence] = useState(5);
    const [sleepStart, setSleepStart] = useState(0);
    const [sleepEnd, setSeleepEnd] = useState(0);
    const [workStart, setWorkStart] = useState(0);
    const [workEnd, setWorkEnd] = useState(0);
    const [areaSet, setAreaSet] = useState(false);

    const logout = () => {
        delete context.authentication;
        history.push('/')
    }

    const handleNext = () => {
        if (formStage === 3) {
            updateUser();
        } else if (formStage === 1) {
            updateAvatar();
            setFormStage(formStage + 1)
        } else {
            setFormStage(formStage + 1)
        }
    }

    const handleBack = () => {
        if (formStage === 0) {

        } else {
            setFormStage(formStage - 1)
        }
    }

    const updateAvatar = () => {
        let axiosConfig = {
            headers: {
                'Content-Type': 'multipart/form-data',
                "Access-Control-Allow-Origin": "*",
            }
        };
        let updatedUser = {
            phone,
        };
        let data = new FormData();
        data.append("phone", phone);
        data.append("avatar", avatar);
        console.log(avatar);
        axios.put(`http://localhost:3000/user/${context.authentication.id}`, data, axiosConfig)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {console.log(err)})
    }

    const updateUser = () => {
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;char=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
        let userUpdate = {
            phone,
            domestic: {
                lat,
                lng,
                social_fence: socialFence,
                sleep_start: sleepStart,
                sleep_end: sleepEnd,
                work_start: workStart,
                work_end: workEnd,
            }
        };
        axios
            .put(`http://localhost:3000/user/${context.authentication.id}`, userUpdate, axiosConfig)
            .then((res) => console.log(res.data, "This from Axios"))
            .catch(err => console.log(err))
    }


    return (
        <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    {(formStage === 0) &&
                    <GridContainer justify="center">
                        <GridItem>
                            <div className={classes.setupForms}>
                                <h2 className={classes.title}>Hi there!</h2>
                                <h3>This looks like a new account. Can we get started with some housekeeping?</h3>
                            </div>
                            <div className={classes.highlights}>
                                <h3>You can change all these settings later, but to use your account we'll need the following information:</h3>
                                <GridContainer justify="center">
                                    <GridItem md={4} sm={4}>
                                        <InfoArea
                                            className={classes.short}
                                            title="Basic Account Settings"
                                            description="Choose a profile picture, provide contact information, and make basic account selections that Trotr uses to connect you with your contacts."
                                            icon={Settings}
                                            iconColor="danger"
                                            vertical={true}
                                        />
                                    </GridItem>
                                    <GridItem md={4} sm={4}>
                                        <InfoArea
                                            className={classes.short}
                                            title="Imported Contacts"
                                            description="Choose from your phone, social media, and email accounts which contacts to import into your Trotr account."
                                            icon={ImportContacts}
                                            iconColor="primary"
                                            vertical={true}
                                        />
                                    </GridItem>
                                    <GridItem md={4} sm={4}>
                                        <InfoArea
                                            className={classes.short}
                                            title="Residence and Travel Details"
                                            description="Make selections about where you live and socialize so Trotr can help you make plans with friends who are living or travelling in your area."
                                            icon={LocationCity}
                                            iconColor="success"
                                            vertical={true}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer justify="center">
                                    <GridItem>
                                        <Button
                                            className={classes.setupButton}
                                            color="primary"
                                            round
                                            onClick={() => logout()}
                                        >
                                            Maybe Later
                                        </Button>
                                        <Button
                                            className={classes.setupButton}
                                            color="danger"
                                            round
                                            onClick={() => setFormStage(1)}
                                        >
                                            Get Started
                                        </Button>
                                    </GridItem>
                                </GridContainer>
                            </div>
                        </GridItem>
                    </GridContainer>}
                    {(formStage === 1) && (
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={8} md={3}>
                                <div className={classes.setupForms}>
                                    <h4>Upload a Profile Picture</h4>
                                    <ImageUpload
                                        avatar
                                        addButtonProps={{ round: true, color: "warning" }}
                                        changeButtonProps={{ round: true , color: "warning"}}
                                        removeButtonProps={{ round: true, color: "danger" }}
                                        onChange={(file) => setAvatar(file)}
                                        restoreDefault={(e) => setAvatar("https://res.cloudinary.com/djipxounx/image/upload/v1624115513/placeholder_bgwuxw.jpg")}
                                    />
                                </div>
                            </GridItem>
                        </GridContainer>
                    )}
                    {(formStage === 5) && (
                        <GridContainer justify="center">
                            <GridItem xs={12} sm={8} md={3}>
                                <div className={classes.setupForms}>
                                    {areaSet ?
                                        <div>
                                            <h4>Set Your Social Fence</h4>
                                            <p>If a friend were visiting from far away for a few days, how far would you
                                                travel to connect with them? That's a "social fence."</p>

                                            <br />
                                            <p>Trotr uses your social fence to find overlapping availability when you or your
                                                friends are travelling, moving, or just looking for someone to spend an afternoon with.</p>
                                            <br />
                                            <p>Drag the edges of the circle on the map below to set a social fence that is
                                                appropriate for you.</p>
                                        </div>
                                        :
                                        <div>
                                            <h4>Set Your Residential Area</h4>
                                            <p>Use the search bar on the map below to select the city or town you live in.</p>
                                        </div>
                                            }
                                    <SearchBox
                                        onAreaSet={() => setAreaSet(true)}
                                        onAreaReset={() => setAreaSet(false)}
                                        setLatLng={(coordinates) => {
                                            setLat(coordinates.lat);
                                            setLng(coordinates.lng)
                                        }}
                                        setRadius={(radius) => {setSocialFence(radius)}}
                                    />
                                </div>
                            </GridItem>
                        </GridContainer>
                    )}
                    {(formStage === 2) && (
                        <GridContainer justify="center">
                                <h4>Set Contact Information</h4>
                                <CustomInput
                                    id="phone"
                                    formControlProps={{
                                        fullWidth: true,
                                        className: classes.input,
                                    }}
                                    inputProps={{
                                        placeholder: "Phone Number...",
                                        type: "text",
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Email className={classes.inputIconsColor} />
                                            </InputAdornment>
                                        ),
                                        onChange: (e) => setPhone(e.target.value)
                                    }}
                                />
                        </GridContainer>
                    )}
                    {formStage > 0 && <ProgressBar
                        steps={4}
                        step={formStage}
                        handleNext={e => handleNext()}
                        handleBack={e => handleBack()}
                    />}
                </div>
        </div>
    )
}


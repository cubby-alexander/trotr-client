import React, {useEffect} from "react";
import {useState, useContext} from "react";
import {useCookies} from "react-cookie";
import {useHistory} from "react-router-dom";
import jwt from "jsonwebtoken";
import ApplicationContext from "../../../ApplicationContext";
import axios from "axios";
import classNames from "classnames";
import {makeStyles} from "@material-ui/core/styles";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import ImageUpload from "../../../components/appComponents/CustomUpload/ImageUpload";

import styles from "../ProfilePage/profilePageStyle";
import InfoArea from "../../../components/InfoArea/InfoArea";
import ImportContacts from "@material-ui/icons/ImportContacts";
import {LocationCity} from "@material-ui/icons";
import {Settings} from "@material-ui/icons";
import Button from "../../../components/appComponents/CustomButtons/Button";
import ProgressBar from "../../../components/appComponents/ProgressBar/ProgressBar";
import InputAdornment from "@material-ui/core/InputAdornment";
import Email from "@material-ui/icons/Email";
import CustomInput from "../../../components/appComponents/CustomInput/CustomInput";
import SearchBox from "../../../components/appComponents/Map/SearchBox";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Datetime from "react-datetime";
import FormControl from "@material-ui/core/FormControl";
import Header from "../../../components/appComponents/Header/Header";
import HeaderLinks from "../../../components/appComponents/Header/HeaderLinks";
import Parallax from "../../../components/appComponents/Parallax/Parallax";
import RecurringFooter from "../recurringViews/RecurringFooter/RecurringFooter";

const useStyles = makeStyles(styles);

export default function SetUpForms(props, {...rest}) {
    const context = useContext(ApplicationContext);
    const [cookies, setCookies, removeCookies] = useCookies(['jwt']);
    const history = useHistory();
    const classes = useStyles();
    const [checkedA, setCheckedA] = React.useState(true);
    const [checkedB, setCheckedB] = React.useState(true);
    const [formStage, setFormStage] = useState(0);
    const [avatar, setAvatar] = useState("https://res.cloudinary.com/djipxounx/image/upload/v1624115513/placeholder_bgwuxw.jpg");
    const [phone, setPhone] = useState("");
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [socialFence, setSocialFence] = useState(null);
    const [sleepStart, setSleepStart] = useState(undefined);
    const [sleepEnd, setSleepEnd] = useState(undefined);
    const [workStart, setWorkStart] = useState(undefined);
    const [workEnd, setWorkEnd] = useState(undefined);
    const [areaSet, setAreaSet] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
    }, [])

    const logout = () => {
        console.log("Logout");
        delete context.authentication;
        history.push('/');
    }

    const handleNext = () => {
        if (formStage === 4) {
            if (lat === null || lng === null || socialFence === null) {
            } else {
                updateUser();
                history.push(`/user/${context.authentication._id}`)
            }
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
        let data = new FormData();
        data.append("avatar", avatar);
        axios.put(`http://localhost:3000/user/${context.authentication._id}/avatar`, data, axiosConfig)
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
                radius: socialFence,
                sleep_start: sleepStart,
                sleep_end: sleepEnd,
                work_start: workStart,
                work_end: workEnd,
            }
        };
        axios
            .put(`http://localhost:3000/user/${context.authentication._id}`, userUpdate, axiosConfig)
            .then((res) => {
                history.push(`/user/${context.authentication._id}`);
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <Header
                color="transparent"
                brand=""
                links={<HeaderLinks dropdownHoverColor="primary"/>}
                fixed
                changeColorOnScroll={{
                    height: 200,
                    color: "primary"
                }}
                {...rest}
            />
            <Parallax
                image={require("assets/img/examples/city.jpg")}
                filter="dark"
                className={classes.parallax}
            />
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
                                            title="Basic Profile Information"
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
                                    <p>...or use this trotting deer in the meantime</p>
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
                    {(formStage === 2) && (
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
                                        onAreaReset={() => {
                                            setAreaSet(false);
                                            setLat(null);
                                            setLng(null);
                                            setSocialFence(null);
                                        }}
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
                    {(formStage === 3) && (
                        <GridContainer justify="center">
                            <GridItem xs={10}>
                                <div>
                                    <h4 className={classes.setupForms}>A Few Optional Details</h4>
                                    <p>What number should we send notifications to?</p>
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
                                    <br />
                                    <br />
                                    <p>Would you like Trotr to take your regular work and sleep schedule into account
                                        when checking your availability for social engagements? </p>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={checkedA}
                                                onChange={event => {
                                                    setCheckedA(event.target.checked);
                                                    setWorkStart(undefined);
                                                    setWorkEnd(undefined);
                                                    }}
                                                value="checkedA"
                                                classes={{
                                                    switchBase: classes.switchBase,
                                                    checked: classes.switchChecked,
                                                    thumb: classes.switchIcon,
                                                    track: classes.switchBar
                                                }}
                                            />
                                        }
                                        classes={{
                                            label: classes.label,
                                            root: classes.labelRoot
                                        }}
                                        label={checkedA ? "Set work schedule" : "Do not set work schedule"}
                                    />
                                    <br />
                                    {checkedA &&
                                    <div className={classes.timeSelection}>
                                        <GridItem xs={10} sm={8}>
                                            <FormControl fullWidth color="primary">
                                                <Datetime
                                                    dateFormat={false}
                                                    onChange={(moment) => setWorkStart(moment._d.getHours())}
                                                    inputProps={{ placeholder: "Regular Time Starting Work" }}
                                                />
                                            </FormControl>
                                        </GridItem>
                                        <GridItem xs={10} sm={8}>
                                            <FormControl fullWidth color="primary">
                                                <Datetime
                                                    dateFormat={false}
                                                    onChange={(moment) => setWorkEnd(moment._d.getHours())}
                                                    inputProps={{ placeholder: "Regular Time Finishing Work" }}
                                                />
                                            </FormControl>
                                        </GridItem>
                                    </div>
                                    }
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={checkedB}
                                                onChange={event => {
                                                    setCheckedB(event.target.checked);
                                                    setSleepStart(undefined);
                                                    setSleepEnd(undefined);
                                                }}
                                                value="checkedA"
                                                classes={{
                                                    switchBase: classes.switchBase,
                                                    checked: classes.switchChecked,
                                                    thumb: classes.switchIcon,
                                                    track: classes.switchBar
                                                }}
                                            />
                                        }
                                        classes={{
                                            label: classes.label,
                                            root: classes.labelRoot
                                        }}
                                        label={checkedB ? "Set sleep schedule" : "Do not set sleep schedule"}
                                    />
                                    {checkedB &&
                                    <div className={classes.timeSelection}>
                                        <GridItem xs={10} sm={8}>
                                            <FormControl fullWidth color="primary">
                                                <Datetime
                                                    dateFormat={false}
                                                    onChange={(moment) => setSleepStart(moment._d.getHours())}
                                                    inputProps={{ placeholder: "Regular Time To Bed" }}
                                                />
                                            </FormControl>
                                        </GridItem>
                                        <GridItem xs={10} sm={8}>
                                            <FormControl fullWidth color="primary">
                                                <Datetime
                                                    dateFormat={false}
                                                    onChange={(moment) => setSleepEnd(moment._d.getHours())}
                                                    inputProps={{ placeholder: "Regular Time Waking Up" }}
                                                />
                                            </FormControl>
                                        </GridItem>
                                    </div>
                                    }
                                </div>
                            </GridItem>
                        </GridContainer>
                    )}
                    {(formStage === 4) && (
                        <GridContainer justify="center">
                            <GridItem>
                                {(lat === null || lng === null || socialFence === null) ?
                                    <div className={classes.setupForms}>
                                        <h3>Uh oh!</h3>
                                        <h4>The residential location and social fence settings are required, but it looks
                                        like you didn't set them.
                                            <br />
                                            <br />
                                        Skip back to that tab and make the necessary selections.
                                        </h4>
                                    </div>
                                    :
                                    <div className={classes.setupForms}>
                                        <h3>All set!</h3>
                                        <h4>Click 'Finish' below to confirm your selections and proceed to your
                                        profile.</h4>
                                    </div>}
                            </GridItem>
                        </GridContainer>
                    )}
                    {formStage > 0 && <ProgressBar
                        steps={5}
                        step={formStage}
                        handleNext={e => handleNext()}
                        handleBack={e => handleBack()}
                    />}
                </div>
        </div>
            <RecurringFooter />
        </div>
    )
}


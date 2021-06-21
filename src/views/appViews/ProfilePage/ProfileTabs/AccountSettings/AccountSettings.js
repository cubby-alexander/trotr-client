import React, {useContext} from "react";
import {useState} from "react";
import axios from "axios";

import GridContainer from "../../../../../components/Grid/GridContainer";
import GridItem from "../../../../../components/Grid/GridItem";
import Accordion from "../../../../../components/appComponents/Accordion/Accordion";
import CustomInput from "../../../../../components/appComponents/CustomInput/CustomInput";

import {makeStyles} from "@material-ui/core/styles";

import InputAdornment from "@material-ui/core/InputAdornment";
import {AccountCircle, LocationCity, Schedule, Security, Delete} from "@material-ui/icons";
import Face from "@material-ui/icons/Face";
import Button from "../../../../../components/appComponents/CustomButtons/Button";
import Email from "@material-ui/icons/Email";
import Icon from "@material-ui/core/Icon";

import javascriptStyles from "./accountSettingsStyles";
import ApplicationContext from "../../../../../ApplicationContext";
import SearchBox from "../../../../../components/appComponents/Map/SearchBox";
import ImageUpload from "../../../../../components/appComponents/CustomUpload/ImageUpload";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import Datetime from "react-datetime";
import {useHistory} from "react-router-dom";
import {Hidden} from "@material-ui/core";

const useStyles = makeStyles(javascriptStyles);

export default function AccountSettings(props) {
    const context = useContext(ApplicationContext);
    const history = useHistory();
    const [name, setName] = useState(props.user.name);
    const [email, setEmail] = useState(props.user.email);
    const [phone, setPhone] = useState(props.user.phone);
    const [avatar, setAvatar] = useState(props.user.avatar);
    const [password, setPassword] = useState(props.user.password);
    const [lat, setLat] = useState(props.user.domestic.lat);
    const [lng, setLng] = useState(props.user.domestic.lng);
    const [socialFence, setSocialFence] = useState(props.user.domestic.radius);
    const [sleepStart, setSleepStart] = useState(props.user.domestic.sleep_start);
    const [sleepEnd, setSleepEnd] = useState(props.user.domestic.sleep_end);
    const [workStart, setWorkStart] = useState(props.user.domestic.work_start);
    const [workEnd, setWorkEnd] = useState(props.user.domestic.work_end);
    const [areaSet, setAreaSet] = useState(true);
    const [checkedA, setCheckedA] = useState(true);
    const [checkedB, setCheckedB] = useState(true);
    const classes = useStyles();

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
            name,
            email,
            password,
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
            .then((res) => console.log(res))
            .catch(err => console.log(err))
    }

    const deleteUser = () => {
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;char=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
        axios.delete(`http://localhost:3000/user/${context.authentication._id}`, axiosConfig)
            .then(res => console.log(res))
            .catch(err => console.log(err));
        delete context.authentication;
        history.push('/');
    }

    return (
        <GridContainer justify="center">
            <Hidden smUp>
                <h3>Manage Account Settings</h3>
            </Hidden>
            <GridItem xs={12} sm={8} md={8}>
                <Accordion
                    activeColor="primary"
                    collapses={[
                        // SEARCHBOX SETUP
                        {
                            title:
                                <div className={classes.accordianTitleLine}>
                                    <LocationCity />
                                    <div className={classes.accordianTitle}>Residential Location and Social Area</div>
                                </div>,
                            content:
                                <div>
                                    <GridItem xs={12} sm={8} md={8}>
                                        <h4>Edit your residence location / social area</h4>
                                        <p>Note:  For most people this information typically wouldn't change often. If you're trying
                                            to update your location temporarily, we suggest using travel settings.</p>
                                        <SearchBox
                                            initalSettings={{
                                                socialFence,
                                                lat,
                                                lng,
                                            }}
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
                                    </GridItem>
                                </div>
                        },

                        {
                            title: <div className={classes.accordianTitleLine}>
                                <Schedule />
                                <div className={classes.accordianTitle}>Work and Sleep Schedules</div>
                            </div>,
                            content:
                                <div>
                                    <GridItem xs={12}>
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
                                </div>
                        },

                        // PRIVACY SETTINGS START
                        {
                            title: <div className={classes.accordianTitleLine}>
                                <Security />
                                <div className={classes.accordianTitle}>Privacy and Security</div>
                            </div>,
                            content:
                                <div>
                                    <GridItem xs={12} sm={8} md={8}>
                                        <h4>Update Your Account Password</h4>
                                        <CustomInput
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            inputProps={{
                                                startAdornment: (
                                                    <InputAdornment
                                                        position="start"
                                                        className={classes.inputAdornment}
                                                    >
                                                        <Icon className={classes.inputAdornmentIcon}>
                                                            lock_outline
                                                        </Icon>
                                                    </InputAdornment>
                                                ),
                                                placeholder: "Update Password...",
                                                type: "password",
                                                onChange: (e) => {setPassword(e.target.value)}
                                            }}
                                        />
                                        <CustomInput
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            inputProps={{
                                                startAdornment: (
                                                    <InputAdornment
                                                        position="start"
                                                        className={classes.inputAdornment}
                                                    >
                                                        <Icon className={classes.inputAdornmentIcon}>
                                                            lock_outline
                                                        </Icon>
                                                    </InputAdornment>
                                                ),
                                                placeholder: "Confirm Update Password...",
                                                type: "password",
                                                onChange: (e) => {setPassword(e.target.value)}
                                            }}
                                        />
                                    </GridItem>
                                </div>
                        },

                        {
                            title:
                                <div className={classes.accordianTitleLine}>
                                    <AccountCircle />
                                    <div className={classes.accordianTitle}>Basic Profile Information</div>
                                </div>
                            ,
                            content:
                                <div>
                                    <GridItem xs={12} sm={8} md={8}>
                                        <h4>Update account / contact information</h4>
                                        <div className={classes.setupForms}>
                                            <p>Change your current profile picture</p>
                                            <ImageUpload
                                                avatar
                                                addButtonProps={{ round: true, color: "warning" }}
                                                changeButtonProps={{ round: true , color: "warning"}}
                                                removeButtonProps={{ round: true, color: "danger" }}
                                                onChange={(file) => setAvatar(file)}
                                                existing
                                                current={avatar}
                                                restoreDefault={(e) => setAvatar("https://res.cloudinary.com/djipxounx/image/upload/v1624115513/placeholder_bgwuxw.jpg")}
                                            />
                                        </div>
                                        <CustomInput
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            inputProps={{
                                                startAdornment: (
                                                    <InputAdornment
                                                        position="start"
                                                        className={classes.inputAdornment}
                                                    >
                                                        <Face className={classes.inputAdornmentIcon}/>
                                                    </InputAdornment>
                                                ),
                                                placeholder: "Full Name...",
                                                value: name,
                                                onChange: (e) => setName(e.target.value)
                                            }}
                                        />
                                        <CustomInput
                                            formControlProps={{
                                                fullWidth: true,
                                            }}
                                            inputProps={{
                                                startAdornment: (
                                                    <InputAdornment
                                                        position="start"
                                                        className={classes.inputAdornment}
                                                    >
                                                        <Email className={classes.inputAdornmentIcon} />
                                                    </InputAdornment>
                                                ),
                                                placeholder: "Email...",
                                                value: email,
                                                onChange: (e) => setEmail(e.target.value)
                                            }}
                                        />

                                    </GridItem>
                                </div>
                        },

                        {
                            title:
                                <div className={classes.accordianTitleLine}>
                                    <Delete />
                                    <div className={classes.accordianTitle}>Delete Account</div>
                                </div>
                            ,
                            content:
                                <div className={classes.setupForms}>
                                    <GridItem xs={12} sm={8} md={8}>
                                        <h4>Careful!
                                            <br />
                                            <br />
                                            This button will delete your entire account, including all your saved information regarding travel, social engagements, and account contacts.</h4>
                                        <Button
                                            color="danger"
                                            onClick={() => deleteUser()}
                                        >Delete Account</Button>
                                    </GridItem>
                                </div>
                        },
                    ]}
                />
            </GridItem>
        </GridContainer>
    )
}
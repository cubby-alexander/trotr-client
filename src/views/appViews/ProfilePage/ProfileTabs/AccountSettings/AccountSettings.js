import React, {useContext} from "react";
import {useState} from "react";
import axios from "axios";

import GridContainer from "../../../../../components/Grid/GridContainer";
import GridItem from "../../../../../components/Grid/GridItem";
import Accordion from "../../../../../components/Accordion/Accordion";
import CustomInput from "../../../../../components/appComponents/CustomInput/CustomInput";

import {makeStyles} from "@material-ui/core/styles";

import {AccountCircle, LocationCity, SaveAlt, Security} from "@material-ui/icons";
import InputAdornment from "@material-ui/core/InputAdornment";
import Face from "@material-ui/icons/Face";
import Button from "../../../../../components/appComponents/CustomButtons/Button";
import Email from "@material-ui/icons/Email";
import Icon from "@material-ui/core/Icon";

import javascriptStyles from "assets/jss/material-kit-pro-react/views/componentsSections/javascriptStyles.js";
import ApplicationContext from "../../../../../ApplicationContext";

const useStyles = makeStyles(javascriptStyles);

export default function AccountSettings(props) {
    const context = useContext(ApplicationContext);
    const [name, setName] = useState(props.user.name);
    const [email, setEmail] = useState(props.user.email);
    const [phone, setPhone] = useState(props.user.phone);
    const [avatar, setAvatar] = useState(props.user.avatar);
    const [password, setPassword] = useState(props.user.password);
    const classes = useStyles();

    return (
        <GridContainer>
            <GridItem xs={12} sm={8} md={8}>
                <Accordion
                    active={0}
                    activeColor="primary"
                    collapses={[
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
                                        <form className={classes.form}>
                                            <CustomInput
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.customFormControlClasses
                                                }}
                                                inputProps={{
                                                    startAdornment: (
                                                        <InputAdornment
                                                            position="start"
                                                            className={classes.inputAdornment}
                                                        >
                                                            <Face className={classes.inputAdornmentIcon} />
                                                        </InputAdornment>
                                                    ),
                                                    endAdornment: (
                                                        <InputAdornment
                                                            position="end"
                                                        >
                                                            <Button size="sm" color="transparent" >
                                                                <SaveAlt className={classes.inputAdornmentIcon} />
                                                            </Button>
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
                                                    className: classes.customFormControlClasses
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
                                                    endAdornment: (
                                                        <InputAdornment
                                                            position="end"
                                                        >
                                                            <Button size="sm" color="transparent" >
                                                                <SaveAlt className={classes.inputAdornmentIcon} />
                                                            </Button>
                                                        </InputAdornment>
                                                    ),
                                                    placeholder: "Email...",
                                                    value: email,
                                                    onChange: (e) => setEmail(e.target.value)
                                                }}
                                            />
                                            <CustomInput
                                                formControlProps={{
                                                    fullWidth: true,
                                                    className: classes.customFormControlClasses
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
                                                    endAdornment: (
                                                        <InputAdornment
                                                            position="end"
                                                        >
                                                            <Button size="sm" color="transparent" >
                                                                <SaveAlt className={classes.inputAdornmentIcon} />
                                                            </Button>
                                                        </InputAdornment>
                                                    ),
                                                    placeholder: "Password...",
                                                    onChange: (e) => {setPassword(e.target.value)}
                                                }}
                                            />
                                        </form>
                                    </GridItem>
                                </div>
                        },
                        {
                            title:
                                <div className={classes.accordianTitleLine}>
                                    <LocationCity />
                                    <div className={classes.accordianTitle}>Residential Settings</div>
                                </div>,
                            content:
                                "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."
                        },
                        {
                            title: <div className={classes.accordianTitleLine}>
                                <Security />
                                <div className={classes.accordianTitle}>Privacy and Security</div>
                            </div>,
                            content:
                                "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS."
                        }
                    ]}
                />
            </GridItem>
        </GridContainer>
    )
}
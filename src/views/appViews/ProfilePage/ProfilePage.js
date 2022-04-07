/*eslint-disable*/
import React, {useState} from "react";
import {useContext, useEffect} from "react";
import ApplicationContext from "../../../ApplicationContext";
import axios from "axios";
import jwt from "jsonwebtoken";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/appComponents/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "../../../components/appComponents/CustomButtons/Button";
import {FlightTakeoff, People, Settings, Timeline, PersonPinCircle} from "@material-ui/icons";
import GridItem from "components/Grid/GridItem.js";
import {Hidden} from "@material-ui/core";
import HeaderLinks from "components/appComponents/Header/HeaderLinks.js";
import Parallax from "components/appComponents/Parallax/Parallax.js";
import Clearfix from "components/appComponents/Clearfix/Clearfix.js";

import AccountSettings from "./ProfileTabs/AccountSettings/AccountSettings";
import RecurringFooter from "../recurringViews/RecurringFooter/RecurringFooter";

import profilePageStyle from "./profilePageStyle.js";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles(profilePageStyle);

export default function ProfilePage(props, { ...rest }) {
    const context = useContext(ApplicationContext);
    const history = useHistory();
    const [profileTab, setProfileTab] = useState("account");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState(false);

    const classes = useStyles();

    const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

    useEffect(() => {
        const checkUser = async () => {
            await axios.get(`${process.env.REACT_APP_BACKEND_URL}user/${props.match.params.id}`)
                .then(res => {
                    setData(jwt.decode(res.data.token).foundUser);
                    context.authentication = jwt.decode(res.data.token).foundUser;
                    console.log(!("domestic" in context.authentication));
                    if (!("domestic" in context.authentication)) history.push(`/user/${props.match.params.id}/setup`);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    setError(true)
                });
        };
        checkUser();
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
    }, []);

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
          {error && <div>Something went wrong ...</div>}
          {loading && <div>Loading ...</div>}
          {data &&
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <GridContainer justify="center">
                        <Button
                            round
                            size="sm"
                            simple={profileTab !== "engagements"}
                            color={profileTab === "engagements" ? "warning" : "primary"}
                            onClick={() => setProfileTab("engagements")}
                        >
                            <PersonPinCircle />
                            <Hidden xsDown>Engagements</Hidden>
                        </Button>

                        <Button
                            round
                            size="sm"
                            simple={profileTab !== "friends"}
                            color={profileTab === "friends" ? "warning" : "primary"}
                            onClick={() => setProfileTab("friends")}
                        >
                            <People />
                            <Hidden xsDown>Friends</Hidden>
                        </Button>
                        <Button
                            round
                            size="sm"
                            simple={profileTab !== "timeline"}
                            color={profileTab === "timeline" ? "warning" : "primary"}
                            onClick={() => setProfileTab("timeline")}
                        >
                            <Timeline />
                            <Hidden xsDown>Timeline</Hidden>
                        </Button>

                        <Button
                            round
                            size="sm"
                            simple={profileTab !== "trips"}
                            color={profileTab === "trips" ? "warning" : "primary"}
                            onClick={() => setProfileTab("trips")}
                        >
                            <FlightTakeoff />
                            <Hidden xsDown>Trips</Hidden>
                        </Button>

                        <Button
                            round
                            size="sm"
                            simple={profileTab !== "account"}
                            color={profileTab === "account" ? "warning" : "primary"}
                            onClick={() => setProfileTab("account")}
                        >
                            <Settings />
                            <Hidden xsDown>Account</Hidden>
                        </Button>
                    </GridContainer>
                    {(profileTab === "account") && <AccountSettings user={data} />}
                    {(profileTab === "trips") && <AccountSettings user={data} />}
                    {(profileTab === "friends") && <AccountSettings user={data} />}
                    {(profileTab === "timeline") && <AccountSettings user={data} />}
                    {(profileTab === "engagements") && <AccountSettings user={data} />}
        <Clearfix />
      </div>
    </div>
        }
        <RecurringFooter />
      </div>
  );
}

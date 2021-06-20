/*eslint-disable*/
import React, {useState} from "react";
import {useContext, useEffect} from "react";
import ApplicationContext from "../../../ApplicationContext";
import axios from "axios";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/appComponents/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/appComponents/Header/HeaderLinks.js";
import NavPills from "components/appComponents/NavPills/NavPills.js";
import Card from "components/appComponents/Card/Card.js";
import CardBody from "components/appComponents/Card/CardBody.js";
import CardHeader from "components/appComponents/Card/CardHeader.js";
import Muted from "components/Typography/Muted.js";
import Parallax from "components/Parallax/Parallax.js";
import Clearfix from "components/Clearfix/Clearfix.js";

import oluEletu from "assets/img/examples/olu-eletu.jpg";
import clemOnojeghuo from "assets/img/examples/clem-onojeghuo.jpg";
import cynthiaDelRio from "assets/img/examples/cynthia-del-rio.jpg";
import mariyaGeorgieva from "assets/img/examples/mariya-georgieva.jpg";
import clemOnojegaw from "assets/img/examples/clem-onojegaw.jpg";

import ResidenceSettings from "./ProfileTabs/ResidenceSettings";
import AccountSettings from "./ProfileTabs/AccountSettings/AccountSettings";
import RecurringFooter from "../recurringViews/RecurringFooter/RecurringFooter";

import profilePageStyle from "./profilePageStyle.js";

const useStyles = makeStyles(profilePageStyle);

export default function ProfilePage(props, { ...rest }) {
    const context = useContext(ApplicationContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState({});

    const classes = useStyles();

    const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

    useEffect(() => {
        const checkUser = async () => {
            axios.get(`http://localhost:3000/user/${props.match.params.id}`)
                .then(res => {
                    console.log(res.data, ("domestic" in res.data));
                    setData(res.data);
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
          {data && ("name" in data) &&
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div className={classes.container}>
                    <GridContainer justify="center">
                      {/*</GridItem>*/}
                      {/*  <GridItem xs={12} sm={12} md={6}>*/}
                      {/*    <div className={classes.profile}>*/}
                      {/*      <div>*/}
                      {/*        <img src={christian} alt="..." className={imageClasses} onClick={() => fireAxios()} />*/}
                      {/*      </div>*/}
                      {/*      <div className={classes.name}>*/}
                      {/*        <h3 className={classes.title}>Christian Louboutin</h3>*/}
                      {/*        <h6>DESIGNER</h6>*/}
                      {/*        <Button*/}
                      {/*          justIcon*/}
                      {/*          simple*/}
                      {/*          color="dribbble"*/}
                      {/*          className={classes.margin5}*/}
                      {/*        >*/}
                      {/*          <i className={classes.socials + " fab fa-dribbble"} />*/}
                      {/*        </Button>*/}
                      {/*        <Button*/}
                      {/*          justIcon*/}
                      {/*          simple*/}
                      {/*          color="twitter"*/}
                      {/*          className={classes.margin5}*/}
                      {/*        >*/}
                      {/*          <i className={classes.socials + " fab fa-twitter"} />*/}
                      {/*        </Button>*/}
                      {/*        <Button*/}
                      {/*          justIcon*/}
                      {/*          simple*/}
                      {/*          color="pinterest"*/}
                      {/*          className={classes.margin5}*/}
                      {/*        >*/}
                      {/*          <i className={classes.socials + " fab fa-pinterest"} />*/}
                      {/*        </Button>*/}
                      {/*      </div>*/}
                      {/*    </div>*/}
                      {/*    <div className={classes.follow}>*/}
                      {/*      <Tooltip*/}
                      {/*        id="tooltip-top"*/}
                      {/*        title="Follow this user"*/}
                      {/*        placement="top"*/}
                      {/*        classes={{ tooltip: classes.tooltip }}*/}
                      {/*      >*/}
                      {/*        <Button*/}
                      {/*          justIcon*/}
                      {/*          round*/}
                      {/*          color="primary"*/}
                      {/*          className={classes.followButton}*/}
                      {/*        >*/}
                      {/*          <Add className={classes.followIcon} />*/}
                      {/*        </Button>*/}
                      {/*      </Tooltip>*/}
                      {/*    </div>*/}
                      {/*  </GridItem>*/}
                </GridContainer>
        {/*<div className={classNames(classes.description, classes.textCenter)}>*/}
        {/*  <p>*/}
        {/*    An artist of considerable range, Chet Faker — the name taken by*/}
        {/*    Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs*/}
        {/*    and records all of his own music, giving it a warm, intimate feel*/}
        {/*    with a solid groove structure.{" "}*/}
        {/*  </p>*/}
        {/*</div>*/}
        <div className={classes.profileTabs}>
          <NavPills
              alignCenter
              color="danger"
              tabs={[
                  {
                      tabButton: "Connections",
                      tabContent: (
                          <AccountSettings />
                      )
                  },
                {
                  tabButton: "Work",
                  tabContent: (<ResidenceSettings/>)
                },
                {
                  tabButton: "Media",
                  tabContent: (
                      <GridContainer justify="center">
                        <GridItem xs={12} sm={12} md={3}>
                          <img
                              alt="..."
                              src={mariyaGeorgieva}
                              className={navImageClasses}
                          />
                          <img
                              alt="..."
                              src={clemOnojegaw}
                              className={navImageClasses}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={3}>
                          <img
                              alt="..."
                              src={clemOnojeghuo}
                              className={navImageClasses}
                          />
                          <img
                              alt="..."
                              src={oluEletu}
                              className={navImageClasses}
                          />
                          <img
                              alt="..."
                              src={cynthiaDelRio}
                              className={navImageClasses}
                          />
                        </GridItem>
                      </GridContainer>
                  )
                }
              ]}
          />
        </div>
        <Clearfix />
      </div>
    </div>
        }
        <RecurringFooter />
      </div>
  );
}

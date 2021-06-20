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
import Button from "components/appComponents/CustomButtons/Button.js";

import christian from "assets/img/faces/christian.jpg";
import oluEletu from "assets/img/examples/olu-eletu.jpg";
import clemOnojeghuo from "assets/img/examples/clem-onojeghuo.jpg";
import cynthiaDelRio from "assets/img/examples/cynthia-del-rio.jpg";
import mariyaGeorgieva from "assets/img/examples/mariya-georgieva.jpg";
import clemOnojegaw from "assets/img/examples/clem-onojegaw.jpg";
import darrenColeshill from "assets/img/examples/darren-coleshill.jpg";
import avatar from "assets/img/faces/avatar.jpg";
import marc from "assets/img/faces/marc.jpg";
import kendall from "assets/img/faces/kendall.jpg";
import cardProfile2Square from "assets/img/faces/card-profile2-square.jpg";

import profilePageStyle from "./profilePageStyle.js";
import ResidenceSettings from "./ProfileTabs/ResidenceSettings";
import SetUpForms from "./SetUpForms/SetUpForms";
import RecurringFooter from "../recurringViews/RecurringFooter/RecurringFooter";

const useStyles = makeStyles(profilePageStyle);

export default function ProfilePage(props, { ...rest }) {
    const context = useContext(ApplicationContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState({});
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

    // ${props.match.params.id}



    useEffect(() => {
        const checkUser = async () => {
            axios.get(`http://localhost:3000/user/${props.match.params.id}`)
                .then(res => {
                    console.log(res.data, ("domestic" in res.data));
                    setData(res.data);
                    setLoading(false);
                    context.authentication = {
                        id: data._id,
                        avatar: data.avatar,
                        name: data.name,
                    }
                })
                .catch(err => setError(true));
        };
        checkUser()
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
          {(!loading && "domestic" in data) ?
            (<div className={classNames(classes.main, classes.mainRaised)}>
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
                  tabButton: "Work",
                  tabContent: (<ResidenceSettings/>)
                },
                {
                  tabButton: "Connections",
                  tabContent: (
                      <div>
                        <GridContainer justify="center">
                          <GridItem
                              xs={12}
                              sm={12}
                              md={5}
                              className={classes.gridItem}
                          >
                            <Card profile plain className={classes.card}>
                              <GridContainer>
                                <GridItem xs={12} sm={12} md={5}>
                                  <CardHeader image plain>
                                    <a href="#pablo">
                                      <img src={avatar} alt="..."/>
                                    </a>
                                    <div
                                        className={classes.coloredShadow}
                                        style={{
                                          backgroundImage: "url(" + avatar + ")",
                                          opacity: "1"
                                        }}
                                    />
                                  </CardHeader>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={7}>
                                  <CardBody plain>
                                    <h4 className={classes.cardTitle}>
                                      Gigi Hadid
                                    </h4>
                                    <Muted>
                                      <h6>MODEL</h6>
                                    </Muted>
                                    <p className={classes.description}>
                                      Don{"'"}t be scared of the truth because we
                                      need to restart the human foundation in
                                      truth...
                                    </p>
                                  </CardBody>
                                </GridItem>
                              </GridContainer>
                            </Card>
                          </GridItem>
                          <GridItem
                              xs={12}
                              sm={12}
                              md={5}
                              className={classes.gridItem}
                          >
                            <Card profile plain className={classes.card}>
                              <GridContainer>
                                <GridItem xs={12} sm={12} md={5}>
                                  <CardHeader image plain>
                                    <a href="#pablo">
                                      <img src={marc} alt="..."/>
                                    </a>
                                    <div
                                        className={classes.coloredShadow}
                                        style={{
                                          backgroundImage: "url(" + marc + ")",
                                          opacity: "1"
                                        }}
                                    />
                                  </CardHeader>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={7}>
                                  <CardBody plain>
                                    <h4 className={classes.cardTitle}>
                                      Marc Jacobs
                                    </h4>
                                    <Muted>
                                      <h6>DESIGNER</h6>
                                    </Muted>
                                    <p className={classes.description}>
                                      Don{"'"}t be scared of the truth because we
                                      need to restart the human foundation in
                                      truth...
                                    </p>
                                  </CardBody>
                                </GridItem>
                              </GridContainer>
                            </Card>
                          </GridItem>
                        </GridContainer>
                        <GridContainer justify="center">
                          <GridItem
                              xs={12}
                              sm={12}
                              md={5}
                              className={classes.gridItem}
                          >
                            <Card profile plain className={classes.card}>
                              <GridContainer>
                                <GridItem xs={12} sm={12} md={5}>
                                  <CardHeader image plain>
                                    <a href="#pablo">
                                      <img src={kendall} alt="..."/>
                                    </a>
                                    <div
                                        className={classes.coloredShadow}
                                        style={{
                                          backgroundImage: "url(" + kendall + ")",
                                          opacity: "1"
                                        }}
                                    />
                                  </CardHeader>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={7}>
                                  <CardBody plain>
                                    <h4 className={classes.cardTitle}>
                                      Kendall Jenner
                                    </h4>
                                    <Muted>
                                      <h6>MODEL</h6>
                                    </Muted>
                                    <p className={classes.description}>
                                      I love you like Kanye loves Kanye. Don
                                      {"'"}t be scared of the truth.
                                    </p>
                                  </CardBody>
                                </GridItem>
                              </GridContainer>
                            </Card>
                          </GridItem>
                          <GridItem
                              xs={12}
                              sm={12}
                              md={5}
                              className={classes.gridItem}
                          >
                            <Card profile plain className={classes.card}>
                              <GridContainer>
                                <GridItem xs={12} sm={12} md={5}>
                                  <CardHeader image plain>
                                    <a href="#pablo">
                                      <img src={cardProfile2Square} alt="..."/>
                                    </a>
                                    <div
                                        className={classes.coloredShadow}
                                        style={{
                                          backgroundImage:
                                              "url(" + cardProfile2Square + ")",
                                          opacity: "1"
                                        }}
                                    />
                                  </CardHeader>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={7}>
                                  <CardBody plain>
                                    <h4 className={classes.cardTitle}>
                                      George West
                                    </h4>
                                    <Muted>
                                      <h6>MODEL/DJ</h6>
                                    </Muted>
                                    <p className={classes.description}>
                                      I love you like Kanye loves Kanye.
                                    </p>
                                  </CardBody>
                                </GridItem>
                              </GridContainer>
                            </Card>
                          </GridItem>
                        </GridContainer>
                      </div>
                  )
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
    </div>) :
            <SetUpForms />
        }}
        <RecurringFooter />
      </div>
  );
}

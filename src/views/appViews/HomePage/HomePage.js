/*eslint-disable*/
import React from "react";
import {useHistory} from "react-router-dom";
// nodejs library to set properties for components

// nodejs library that concatenates classes

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/appComponents/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/appComponents/CustomButtons/Button.js";
import HeaderLinks from "components/appComponents/Header/HeaderLinks.js";
import Parallax from "components/appComponents/Parallax/Parallax.js";

import styles from "./homePageStyles";

const useStyles = makeStyles(styles);

export default function LandingPage({ ...rest }) {

    const history = useHistory();
    const classes = useStyles();

    React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    });

  return (
    <div>
      <Header
        color="transparent"
        links={<HeaderLinks dropdownHoverColor="info" />}
        fixed
        changeColorOnScroll={{
          height: 300,
          color: "info"
        }}
        {...rest}
      />
      <Parallax>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={8} md={8}>
              <h1 className={classes.title}>"Social Media" That Happens In Person</h1>
              <h4 className={classes.heroText}>
                Life happens in person, not on a screen. Trotr is a social media app that wants to
                  make it easy for you to connect with your friends in person, like a... person. No
                  tags. No shares. No doom-scrolls.
                  <br />
                  <br />
                  It's just a quick and easy way to see who you can spend time with, whether you're
                  travelling, moving, or just out for the afternoon.
              </h4>
              <br />
              <Button
                color="warning"
                size="lg"
                target="_blank"
                onClick={() => history.push('/signup')}
              >
                Get Started
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
    </div>
  );
}

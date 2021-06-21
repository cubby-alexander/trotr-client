/*eslint-disable*/
import React, {useContext} from "react";
import {useState} from "react";
import {useHistory} from "react-router-dom";

import jwt from "jsonwebtoken";
import ApplicationContext from "../../../../ApplicationContext";
import axios from "axios";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Favorite from "@material-ui/icons/Favorite";

// core components
import Footer from "components/appComponents/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/appComponents/CustomButtons/Button.js";
import Card from "components/appComponents/Card/Card.js";
import CardBody from "components/appComponents/Card/CardBody.js";
import CardHeader from "components/appComponents/Card/CardHeader.js";
import CustomInput from "components/appComponents/CustomInput/CustomInput.js";
import {Link} from "react-router-dom";

import loginPageStyle from "../authenticationStyles.js";

import image from "assets/img/bg7.jpg";
import SnackbarContent from "../../../../components/appComponents/Snackbar/SnackbarContent";

const useStyles = makeStyles(loginPageStyle);

export default function LoginPage() {
  const context = useContext(ApplicationContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayError, setDisplayError] = useState(false);
  const history = useHistory();

  const classes = useStyles();

  const attemptLogin = () => {
    let axiosConfig = {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    };
    let user = {
      email,
      password
    };
    axios.post("http://localhost:3000/user/login", user, axiosConfig)
        .then((res) => {
          if (res.data.token) {
            const decoded = jwt.decode(res.data.token);
            context.authentication = decoded.foundUser;
            if (context.authentication.domestic) {
              console.log("pushing to profile", decoded.foundUser)
              history.push(`/user/${decoded.foundUser._id}`);
            } else {
              console.log("pushing to setup", decoded.foundUser._id, decoded.foundUser)
              history.push(`/user/${decoded.foundUser._id}/setup`)
            }
          } else {
            setDisplayError(true)
          }
        })
        .catch((err) => console.log(err))
  }

  const passwordKeyed = event => {
    if (event.key === "Enter") {
      attemptLogin();
    }
  }

  return (
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={10} sm={8} md={6} lg={4}>
              <Card>
                <form className={classes.form}>
                  <CardHeader
                    color="primary"
                    signup
                    className={classes.cardHeader}
                  >
                    <Link to="/">
                      <img src="/logo.png" alt="Logo" className={classes.logo} />
                    </Link>
                  </CardHeader>
                  <CardBody signup>
                    <h4 className={classes.textCenter}>Login to Account</h4>
                    <CustomInput
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        placeholder: "Email...",
                        type: "email",
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                        onFocus: () => setDisplayError(false),
                        onChange: (e) => setEmail(e.target.value)
                      }}
                    />
                    <CustomInput
                      id="pass"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        placeholder: "Password",
                        type: "password",
                        startAdornment: (
                          <InputAdornment position="start">
                            <Icon className={classes.inputIconsColor}>
                              lock_utline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                        onFocus: () => setDisplayError(false),
                        onChange: (e) => setPassword(e.target.value),
                        onKeyPress: (e) => passwordKeyed(e)
                      }}
                    />
                  </CardBody>
                  <div className={classes.textCenter}>
                    <Button
                        color="warning"
                        round
                        onClick={() => attemptLogin()}
                    >
                      Log In
                    </Button>
                    <br />
                    <br />
                    <p>Don't have an account? <Link to='/signup'>Sign up for Trotr</Link></p>
                    <p>Forgot your login information? <Link to='/reset'>Reset my password.</Link></p>
                    <br />
                    {displayError ? <SnackbarContent
                        message={
                          <span>Incorrect username or password.</span>
                        }
                        close
                        color="danger"
                        icon="info_outline"
                    /> : ""}
                  </div>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer
          className={classes.footer}
          content={
            <div>
              <div className={classes.left}>
                <List className={classes.list}>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/?ref=mkpr-login"
                      target="_blank"
                      className={classes.block}
                    >
                      Cubby Alexander
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/presentation?ref=mkpr-login"
                      target="_blank"
                      className={classes.block}
                    >
                      About us
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="//blog.creative-tim.com/"
                      className={classes.block}
                    >
                      Blog
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/license?ref=mkpr-login"
                      target="_blank"
                      className={classes.block}
                    >
                      Licenses
                    </a>
                  </ListItem>
                </List>
              </div>
              <div className={classes.right}>
                &copy; {1900 + new Date().getYear()}, made with{" "}
                <Favorite className={classes.icon} /> by{" "}
                <a
                  href="https://www.creative-tim.com?ref=mkpr-login"
                  target="_blank"
                >
                  Cubby Alexander
                </a>{" "}
                for a better web
              </div>
            </div>
          }
        />
      </div>
  );
}

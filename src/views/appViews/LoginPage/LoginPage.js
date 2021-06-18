/*eslint-disable*/
import React, {useContext} from "react";
import {useState} from "react";
import {useHistory} from "react-router-dom";
import {useCookies} from "react-cookie";
import ApplicationContext from "../../../ApplicationContext";
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
import Face from "@material-ui/icons/Face";
// core components
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/appComponents/CustomButtons/Button.js";
import Card from "components/appComponents/Card/Card.js";
import CardBody from "components/appComponents/Card/CardBody.js";
import CardHeader from "components/appComponents/Card/CardHeader.js";
import CustomInput from "components/appComponents/CustomInput/CustomInput.js";
import {Link} from "react-router-dom";

import loginPageStyle from "assets/jss/material-kit-pro-react/views/loginPageStyle.js";

import image from "assets/img/bg7.jpg";
import SnackbarContent from "../../../components/Snackbar/SnackbarContent";

const useStyles = makeStyles(loginPageStyle);

export default function LoginPage() {
  const authenticationContext = useContext(ApplicationContext);
  const [cookies, setCookies] = useCookies('jwt');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayError, setDisplayError] = useState(false);
  const history = useHistory();

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
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
    console.log(user);
    axios.post("http://localhost:3000/user/login", user, axiosConfig)
        .then((res) => {
          history.push(`/user/${res.data._id}`);
          console.log(res);
        })
        .catch((err) => console.log(err))
  }

  const passwordKeyed = event => {
    console.log(event.key);
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
            <GridItem xs={12} sm={12} md={4}>
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
                        onChange: (e) => setPassword(e.target.value),
                        onKeyPress: (e) => passwordKeyed(e)
                      }}
                    />
                  </CardBody>
                  <div className={classes.textCenter}>
                    <Button
                        simple
                        color="primary"
                        size="lg"
                        onClick={() => attemptLogin()}
                    >
                      Log In
                    </Button>

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
                      Creative Tim
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
                &copy; {1900 + new Date().getYear()} , made with{" "}
                <Favorite className={classes.icon} /> by{" "}
                <a
                  href="https://www.creative-tim.com?ref=mkpr-login"
                  target="_blank"
                >
                  Creative Tim
                </a>{" "}
                for a better web
              </div>
            </div>
          }
        />
      </div>
  );
}

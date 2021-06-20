/*eslint-disable*/
import React, {useContext} from "react";
import {useState} from "react";
import {useHistory} from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Favorite from "@material-ui/icons/Favorite";
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

import loginPageStyle from "../loginPageStyle.js";

import image from "assets/img/bg7.jpg";
import SnackbarContent from "../../../../components/Snackbar/SnackbarContent";

const useStyles = makeStyles(loginPageStyle);

export default function ResetRequest() {
  const [email, setEmail] = useState("");
  const [displayError, setDisplayError] = useState(false);
  const history = useHistory();

  const classes = useStyles();

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
                    <h4 className={classes.textCenter}>Request Password Reset</h4>
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
                  </CardBody>
                  <div className={classes.textCenter}>
                    <Button
                        color="warning"
                        round
                        onClick={() => attemptLogin()}
                    >
                      Send Reset Link
                    </Button>
                    <br />
                    <br />
                    <p>Don't have an account? <Link to='/signup'>Sign up for Trotr</Link></p>
                    <p>Remember your password? <Link to='/reset'>Login to my account</Link></p>
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

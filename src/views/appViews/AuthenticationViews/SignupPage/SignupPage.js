/*eslint-disable*/
import React from "react";
import {useState, useContext, useEffect} from "react";
import {useHistory} from "react-router-dom";
import jwt from "jsonwebtoken";
import axios from "axios";
import ApplicationContext from "../../../../ApplicationContext";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Icon from "@material-ui/core/Icon";
import {PersonPinCircle} from "@material-ui/icons";
import EventAvailable from "@material-ui/icons/EventAvailable";
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import Check from "@material-ui/icons/Check";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/appComponents/Header/Header.js";
import HeaderLinks from "components/appComponents/Header/HeaderLinks.js";
import Footer from "components/appComponents/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/appComponents/CustomButtons/Button.js";
import Card from "components/appComponents/Card/Card.js";
import CardBody from "components/appComponents/Card/CardBody.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import CustomInput from "components/appComponents/CustomInput/CustomInput.js";
import SnackbarContent from "../../../../components/appComponents/Snackbar/SnackbarContent";

import signupPageStyle from "./signupPageStyle";

import image from "assets/img/bg7.jpg";
import {useCookies} from "react-cookie";

const useStyles = makeStyles(signupPageStyle);

export default function SignUpPage({ ...rest }) {
  const history = useHistory();
  const context = useContext(ApplicationContext);
  const [checked, setChecked] = useState([]);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmError, setConfirmError] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const handleToggle = value => {
    console.log(checked);
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    console.log(newChecked);
  };

  const classes = useStyles();

  const submitSignUp = () => {
    setDisplayError(false);
    setErrorMessages([]);
    let errors = [];
    console.log(checked);
    if (password !== confirm || name === "" || checked[0] !== 1 || password === "") {
      console.log("Assholes");
      if (password !== confirm) {
        setPasswordError(true);
        setConfirmError(true);
        errors.push("'Password' and 'Confirm Password' fields do not match")
      }
      if (password === "") {
        setPasswordError(true);
        errors.push("'Password' field is empty")
      }
      if (name === "") {
        setNameError(true);
        errors.push("'Full Name' field is empty")
      }
      if (email === "") {
        setEmailError(true);
        errors.push("'Email' field is empty")
      }
      if (checked[0] !== 1) {
        errors.push("Did not agree to terms and conditions");
      }
      setDisplayError(true);
      setErrorMessages(errors);
    } else {
      console.log("Creating...")
      createUser();
    }
  }

  const createUser = () => {
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;char=UTF-8',
        "Access-Control-Allow-Origin": "*",
      }
    };
    let newUser = { name, email, password};
    axios.post("http://localhost:3000/user/", newUser, axiosConfig)
        .then((res) => {
          const newUser = jwt.decode(res.data.token).newUser;
          context.authentication = newUser;
          history.push(`/user/${newUser._id}/setup`)
        })
        .catch((err) => console.log(err))
  }

  return (
    <div>
      <Header
        absolute
        color="transparent"
        links={<HeaderLinks dropdownHoverColor="primary" />}
        {...rest}
      />
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
            <GridItem xs={12} sm={12} md={10}>
              <Card className={classes.cardSignup}>
                <h2 className={classes.cardTitle}>Create Trotr Account</h2>
                <CardBody>
                  <GridContainer justify="center">
                    <GridItem xs={12} sm={5} md={5}>
                      <h4 className={classes.textCenter}>The two step genius of Trotr...</h4>
                      <InfoArea
                        className={classes.infoArea}
                        title="Who's in my area?"
                        description="If your friend is travelling on another continent, they're not free for drinks."
                        icon={PersonPinCircle}
                        iconColor="success"
                      />
                      <InfoArea
                        className={classes.infoArea}
                        title="Are they available?"
                        description={`Skip the schedule dance and figure out when you're both free.`}
                        icon={EventAvailable}
                        iconColor="primary"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={5} md={5}>
                      <form className={classes.form}>
                        <CustomInput
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses,
                            error: nameError,
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
                            placeholder: "Full Name...",
                            onFocus: () => {setNameError(false)},
                            onChange: (e) => setName(e.target.value)
                          }}
                        />
                        <CustomInput
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses,
                            error: emailError
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
                            onFocus: () => {setEmailError(false)},
                            onChange: (e) => setEmail(e.target.value)
                          }}
                        />
                        <CustomInput
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses,
                            error: passwordError
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
                            placeholder: "Password...",
                            onFocus: () => {setPasswordError(false)},
                            onChange: (e) => {setPassword(e.target.value)}
                          }}
                        />
                        <CustomInput
                            formControlProps={{
                              fullWidth: true,
                              className: classes.customFormControlClasses,
                              error: confirmError,
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
                              placeholder: "Confirm Password...",
                              onFocus: () => {setConfirmError(false)},
                              onChange: (e) => {setConfirm(e.target.value)}
                            }}
                        />
                        <FormControlLabel
                          classes={{
                            label: classes.label
                          }}
                          control={
                            <Checkbox
                              tabIndex={-1}
                              onClick={() => handleToggle(1)}
                              checkedIcon={
                                <Check className={classes.checkedIcon} />
                              }
                              icon={<Check className={classes.uncheckedIcon} />}
                              classes={{
                                checked: classes.checked,
                                root: classes.checkRoot
                              }}
                              checked={checked.indexOf(1) !== -1 ? true : false}
                            />
                          }
                          label={
                            <span>
                              I agree to the{" "}
                              <a href="#pablo">terms and conditions</a>.
                            </span>
                          }
                        />
                        <div className={classes.textCenter}>
                          <Button round color="primary" onClick={() => submitSignUp()}>
                            Get started
                          </Button>
                        </div>
                      </form>
                    </GridItem>
                  </GridContainer>
                </CardBody>
                {displayError ? <SnackbarContent
                    message={
                      <span>
                        <b>Form contains missing or incorrect Info:</b>
                        <br />
                        <ul>
                          {errorMessages.map((error, idx) => {
                            return <li key={idx}>{error}</li>
                          })}
                        </ul>
                      </span>
                    }
                    close
                    color="danger"
                    icon="info_outline"
                /> : ""}
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer
          content={
            <div>
              <div className={classes.left}>
                <List className={classes.list}>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/?ref=mkpr-signup"
                      target="_blank"
                      className={classes.block}
                    >
                      Cubby Alexander
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/presentation?ref=mkpr-signup"
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
                      href="https://www.creative-tim.com/license?ref=mkpr-signup"
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
                  href="https://www.creative-tim.com?ref=mkpr-signup"
                  target="_blank"
                >
                  Cubby Alexander
                </a>{" "}
                for a better web.
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}

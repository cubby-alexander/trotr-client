import Card from "../../Card/Card";
import DialogTitle from "@material-ui/core/DialogTitle";
import CardHeader from "../../Card/CardHeader";
import Button from "../../CustomButtons/Button";
import Close from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import CardBody from "../../Card/CardBody";
import CustomInput from "../../CustomInput/CustomInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Face from "@material-ui/icons/Face";
import Mail from "@material-ui/icons/Mail";
import Icon from "@material-ui/core/Icon";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import React from "react";
import {useState} from "react";
import axios from "axios";
import Slide from "@material-ui/core/Slide";
import { makeStyles } from "@material-ui/core/styles";
import javascriptStyles from "assets/jss/material-kit-pro-react/views/componentsSections/javascriptStyles.js";
import AccountCircle from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles(javascriptStyles);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

export default function LoginModal() {
    const [loginModal, setLoginModal] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const classes = useStyles();

    const login = () => {
        console.log("Axios")
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;char=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
        let signInUser = { email, password};
        axios.get("http://localhost:3000/user/", signInUser, axiosConfig)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    return (
        <div>
            <Button block
                    round
                    onClick={() => setLoginModal(true)}
                    color="transparent"
            >
                <AccountCircle /> Login
            </Button>
            <Dialog
                classes={{
                    root: classes.modalRoot,
                    paper: classes.modal + " " + classes.modalLogin
                }}
                open={loginModal}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setLoginModal(false)}
                aria-labelledby="login-modal-slide-title"
                aria-describedby="login-modal-slide-description"
            >
                <Card plain className={classes.modalLoginCard}>
                    <DialogTitle
                        id="login-modal-slide-title"
                        disableTypography
                        className={classes.modalHeader}
                    >
                        <CardHeader
                            plain
                            color="primary"
                            className={
                                classes.textCenter + " " + classes.cardLoginHeader
                            }
                        >
                            <Button
                                simple
                                className={classes.modalCloseButton}
                                key="close"
                                aria-label="Close"
                                onClick={() => setLoginModal(false)}
                            >
                                {" "}
                                <Close className={classes.modalClose} />
                            </Button>
                            <h5 className={classes.cardTitleWhite}>Log in</h5>
                            <div className={classes.socialLine}>
                                <Button
                                    justIcon
                                    link
                                    className={classes.socialLineButton}
                                >
                                    <i className="fab fa-facebook-square" />
                                </Button>
                                <Button
                                    justIcon
                                    link
                                    className={classes.socialLineButton}
                                >
                                    <i className="fab fa-twitter" />
                                </Button>
                                <Button
                                    justIcon
                                    link
                                    className={classes.socialLineButton}
                                >
                                    <i className="fab fa-google-plus-g" />
                                </Button>
                            </div>
                        </CardHeader>
                    </DialogTitle>
                    <DialogContent
                        id="login-modal-slide-description"
                        className={classes.modalBody}
                    >
                        <form>
                            <p
                                className={
                                    classes.description + " " + classes.textCenter
                                }
                            >
                                Or Be Classical
                            </p>
                            <CardBody className={classes.cardLoginBody}>
                                <CustomInput
                                    id="login-modal-email"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Mail className={classes.icon} />
                                            </InputAdornment>
                                        ),
                                        placeholder: "Email...",
                                        onChange: (e) => setEmail(e.target.value),
                                    }}
                                />
                                <CustomInput
                                    id="login-modal-pass"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Icon className={classes.icon}>
                                                    lock_outline
                                                </Icon>
                                            </InputAdornment>
                                        ),
                                        placeholder: "Password...",
                                        onChange: (e) => setPassword(e.target.value),
                                    }}
                                />
                            </CardBody>
                        </form>
                    </DialogContent>
                    <DialogActions
                        className={
                            classes.modalFooter + " " + classes.justifyContentCenter
                        }
                    >
                        <Button color="primary" simple size="lg" onClick={login()}>
                            Get started
                        </Button>
                    </DialogActions>
                </Card>
            </Dialog>
        </div>
    )
}
import Card from "../Card/Card";
import DialogTitle from "@material-ui/core/DialogTitle";
import CardHeader from "../Card/CardHeader";
import Button from "../CustomButtons/Button";
import Close from "@material-ui/icons/Close";
import DialogContent from "@material-ui/core/DialogContent";
import CardBody from "../Card/CardBody";
import CustomInput from "../CustomInput/CustomInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Face from "@material-ui/icons/Face";
import Mail from "@material-ui/icons/Mail";
import Icon from "@material-ui/core/Icon";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import React, {useEffect} from "react";
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

export default function LoginModal({ isOpen: parentLoginModal, isOpenChange }) {
    const props = { props };
    const [isOpen, setIsOpen] = useState(parentLoginModal);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const classes = useStyles();

    const closeModal = () => {
        setIsOpen(false);
        isOpenChange({
            modal: "login",
            newState: "closed",
        });
    }

    useEffect(() => {
        setIsOpen(parentLoginModal);
    }, [parentLoginModal]);

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
            <Dialog
                classes={{
                    root: classes.modalRoot,
                    paper: classes.modal + " " + classes.modalLogin
                }}
                open={isOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => closeModal()}
                aria-labelledby="login-modal-slide-title"
                aria-describedby="login-modal-slide-description"
            >
                <Card plain className={classes.modalLoginCard}>
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
                        <Button
                            color="primary"
                            round
                            size="md"
                            onClick={() => login()}
                        >
                            Log In
                        </Button>
                    </DialogActions>
                </Card>
            </Dialog>
        </div>
    )
}
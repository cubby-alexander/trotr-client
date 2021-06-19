import React from "react";

import {makeStyles, useTheme} from "@material-ui/core/styles";
import classNames from "classnames";

import GridItem from "../../../components/Grid/GridItem";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import GridContainer from "../../../components/Grid/GridContainer";
import styles from "./progressBarStyle.js";

const useStyles = makeStyles(styles)

export default function ProgressBar(props) {
    const classes = useStyles();
    const theme = useTheme();
    const activeStep = props.step;

    console.log(props.step + " out of " + props.steps);

    return (
        <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
                <MobileStepper
                    variant="progress"
                    steps={props.steps}
                    position="static"
                    activeStep={props.step}
                    className={classNames(classes.root, classes.override)}
                    nextButton={
                        <Button size="small" onClick={props.handleNext}>
                            {props.step === (props.steps - 1) ? "Finish" : "Next"}
                            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={props.handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                            Back
                        </Button>
                    }
                />
            </GridItem>
        </GridContainer>
    )
}
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Favorite from "@material-ui/icons/Favorite";
import Footer from "../../../../components/Footer/Footer";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import profilePageStyle from "../../ProfilePage/profilePageStyle.js";

const useStyles = makeStyles(profilePageStyle);


export default function RecurringFooter() {
    const classes = useStyles();
    return (
        <Footer
            content={
                <div>
                    <div className={classes.left}>
                        <List className={classes.list}>
                            <ListItem className={classes.inlineBlock}>
                                <a
                                    href="https://www.creative-tim.com/?ref=mkpr-profile"
                                    className={classes.block}
                                >
                                    Creative Tim
                                </a>
                            </ListItem>
                            <ListItem className={classes.inlineBlock}>
                                <a
                                    href="https://www.creative-tim.com/presentation?ref=mkpr-profile"
                                    className={classes.block}
                                >
                                    About us
                                </a>
                            </ListItem>
                            <ListItem className={classes.inlineBlock}>
                                <a href="//blog.creative-tim.com/" className={classes.block}>
                                    Blog
                                </a>
                            </ListItem>
                            <ListItem className={classes.inlineBlock}>
                                <a
                                    href="https://www.creative-tim.com/license?ref=mkpr-profile"
                                    className={classes.block}
                                >
                                    Licenses
                                </a>
                            </ListItem>
                        </List>
                    </div>
                    <div className={classes.right}>
                        &copy; {1900 + new Date().getYear()} , made with{" "}
                        <Favorite className={classes.icon}/> by{" "}
                        <a
                            href="https://www.creative-tim.com?ref=mkpr-profile"
                        >
                            Creative Tim
                        </a>{" "}
                        for a better web.
                    </div>
                </div>
            }
        />
    )
}
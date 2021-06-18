import React from "react";
import {CookiesProvider} from "react-cookie";
import {MuiThemeProvider} from "@material-ui/core";
import ApplicationContext from "./ApplicationContext";
import muiTheme from "./muiTheme";
import Routing from "./routing";

export default function App() {
    const context = {}

    return (
        <ApplicationContext.Provider value={context}>
            <CookiesProvider>
                <MuiThemeProvider theme={muiTheme}>
                    <Routing />
                </MuiThemeProvider>
            </CookiesProvider>
        </ApplicationContext.Provider>
    )
}
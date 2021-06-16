import React from "react";
import {MuiThemeProvider} from "@material-ui/core";
import muiTheme from "./muiTheme";
import Routing from "./routing";

export default function App() {
    return (
        <MuiThemeProvider theme={muiTheme}>
            <Routing />
        </MuiThemeProvider>
    )
}
import {createMuiTheme} from "@material-ui/core";

const muiTheme = createMuiTheme({
    typography: {
        fontFamily: [
            'Proxima Nova',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    palette: {
        primary: {
            main: "#004643",
            light: "#abd1c6",
            dark: "#001e1d"
        }
    },
});

export default muiTheme;
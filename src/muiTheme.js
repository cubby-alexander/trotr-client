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
});

export default muiTheme;
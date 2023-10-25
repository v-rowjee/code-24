import { createTheme } from '@mui/material';
import Colours from '../colours';

const theme = createTheme({
    palette: {
        primary: {
            main: Colours.primaryOrange,
        },
        secondary: {
            main: Colours.secondaryOrange,
        },
        text: {
            light: Colours.lightText,
            dark: Colours.darkText,
        },
    },
    typography: {
        fontFamily: [
            'Roboto',
            'sans-serif',
        ].join(','),
    },
});

export default theme;
import { createTheme } from "@mui/material/styles";
import { KColors } from "@constants-libs";

const theme = createTheme({
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: KColors.primary.moderate,
                    },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    "&.Mui-focused": {
                        color: KColors.primary.moderate,
                    },
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    "&.Mui-focused": {
                        color: KColors.primary.moderate,
                    },
                },
            },
        },
    },
});

export default theme;

import { createTheme } from "@mui/material/styles";
import { KColors } from "@constants-libs";

const theme = createTheme({
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    transition: "all 0.2s ease-in-out",
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: KColors.primary.moderate,
                        borderWidth: "1px",
                        boxShadow: `0 0 0 .25rem ${KColors.primary.alpha[32]}`
                    },
                    "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                        borderColor: KColors.secondary.moderate, // Màu đỏ error
                        borderWidth: "1px",
                        boxShadow: `0 0 0 .25rem ${KColors.secondary.alpha[32]}`
                    },
                    // "&.Mui-error.Mui-focused": {
                    //     boxShadow: "0 0 10px 2px rgba(211, 47, 47, 0.5)", // BoxShadow đỏ khi error + focus

                    // },
                    // "&.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    //     borderColor: "#d32f2f", // Border đỏ khi error + focus
                    //     borderWidth: "2px",
                    // },
                },
                notchedOutline: {
                    borderWidth: "1px", // Border mỏng hơn (mặc định là 2px khi focus)
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    "&.Mui-focused": {
                        color: KColors.primary.moderate,
                    },
                    "&.Mui-error": {
                        color: KColors.secondary.moderate,
                    },
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    "&.Mui-focused": {
                        color: KColors.secondary.moderate,
                    },
                    "&.Mui-error": {
                        color: KColors.secondary.moderate,
                    },
                },
            },
        },
        MuiAutocomplete: {
            styleOverrides: {
                paper: {
                    marginTop: "4px", // Hoặc thêm vào paper
                },
            },
        },
    },
});

export default theme;

import { Button, CircularProgress } from "@mui/material";
import React, { CSSProperties, memo, useMemo } from "react";
import styleHelper from "../styleHelper";
import { KButtonProps } from "../types";
import KLabel from "../Label";



const Base = React.forwardRef<HTMLButtonElement, KButtonProps>(
    (props, ref) => {
        const {
            variant = "contained",
            size = "medium",
            color = "primary",
            bgColor,
            textColor,
            borderColor,
            borderRadius,
            loading = false,
            loadingText,
            fullWidth = false,
            disabled,
            iconStart,
            iconEnd,
            children,
            style,
            title,
            ...rest
        } = props;

        const { mStyle, mProps } = styleHelper.destructStyles(rest);

        const { innerStyle, innerProps } = useMemo(() => {
            const innerStyle = {
                ...mStyle.layout,
                ...mStyle.spacing,
                ...mStyle.textStyle,
                ...style,
            };
            return { innerStyle, innerProps: mProps };
        }, [mStyle, style]);





        const renderLoading = useMemo
            (() => {
                return (
                    <>
                        <CircularProgress
                            color="inherit"
                            sx={{ mr: loadingText ? "0.5rem" : 0 }}
                        />
                        {loadingText}
                    </>
                );
            }, [loading, loadingText, size]);

        return (
            <Button
                ref={ref}
                variant={variant}
                color={color}
                fullWidth={fullWidth}
                disabled={disabled || loading}
                startIcon={loading ? undefined : iconStart}
                endIcon={loading ? undefined : iconEnd}
                style={innerStyle}
                {...innerProps}
            >
                {loading ? (
                    renderLoading
                ) : (
                    title && <KLabel.Text textTransform="uppercase">{title}</KLabel.Text>
                )}
            </Button>
        );
    },
);

Base.displayName = "KButton.Base";

export default memo(Base);

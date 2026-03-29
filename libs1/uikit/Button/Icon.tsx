import { IconButton, CircularProgress } from "@mui/material";
import React, { CSSProperties, memo, useMemo } from "react";
import styleHelper from "../styleHelper";
import { TypeIcon, TypeSpacing, TypeStyleText, TypeLayout, TypeStyling } from "../types";
import { SxProps } from "@mui/material";
import { KColors } from "@constants-libs";

type KButtonIconVariant = "contained" | "outlined" | "default";

interface KButtonIconProps extends TypeSpacing, TypeStyleText, TypeLayout, TypeStyling {
    /** MUI icon component (pass the component, not <Component />) */
    icon: TypeIcon;
    /** Button variant: "contained" (filled bg), "outlined" (border), "default" (transparent) */
    variant?: KButtonIconVariant;
    /** MUI IconButton size */
    size?: "small" | "medium" | "large";
    /** MUI color preset */
    color?: "primary" | "secondary" | "success" | "error" | "info" | "warning" | "inherit" | "default";
    /** Custom icon color */
    iconColor?: string;
    /** Custom background color (overrides variant bg) */
    bgColor?: string;
    /** Show loading spinner */
    loading?: boolean;
    /** Disabled state */
    disabled?: boolean;
    /** Click handler */
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    /** Additional MUI sx styles */
    sx?: SxProps;
    /** Additional icon sx styles */
    sxIcon?: SxProps;
    /** Custom inline style */
    style?: CSSProperties;
    /** Tooltip title (optional) */
    title?: string;
}

const Icon = React.forwardRef<HTMLButtonElement, KButtonIconProps>(
    (props, ref) => {
        const {
            icon: IconComponent,
            variant = "contained",
            size = "medium",
            color = "default",
            iconColor,
            bgColor,
            loading = false,
            disabled,
            onClick,
            sx,
            sxIcon,
            style,
            title,
            ...rest
        } = props;

        const { mStyle, mProps } = styleHelper.destructStyles(rest);

        const { innerStyle, innerSx } = useMemo(() => {
            const innerStyle: CSSProperties = {
                ...mStyle.layout,
                ...mStyle.spacing,
                ...style,
            };

            const variantSx: Record<string, any> =
                variant === "contained"
                    ? {
                        backgroundColor: bgColor || KColors.primary.moderate,
                        color: iconColor || "#fff",
                        borderRadius: "4px",
                        "&:hover": {
                            backgroundColor: bgColor || KColors.primary.moderate,
                            opacity: 0.85,
                        },
                    }
                    : variant === "outlined"
                        ? {
                            backgroundColor: "transparent",
                            color: iconColor || KColors.primary.moderate,
                            border: `1px solid ${bgColor || KColors.primary.moderate}`,
                            borderRadius: "4px",
                            "&:hover": {
                                backgroundColor: bgColor || KColors.primary.mild,
                                opacity: 0.85,
                            },
                        }
                        : {
                            borderRadius: "4px",
                            ...(bgColor && {
                                backgroundColor: bgColor,
                                "&:hover": { backgroundColor: bgColor, opacity: 0.85 },
                            }),
                            ...(iconColor && { color: iconColor }),
                        };

            const innerSx: SxProps = {
                outline: "none",
                "&:focus": { outline: "none" },
                "&:focus-visible": { outline: "none" },
                ...variantSx,
                ...sx,
            };

            return { innerStyle, innerSx };
        }, [mStyle, style, bgColor, iconColor, variant, sx]);

        return (
            <IconButton
                ref={ref}
                size={size}
                color={variant === "default" ? color : undefined}
                disabled={disabled || loading}
                onClick={onClick}
                style={innerStyle}
                sx={innerSx}
                title={title}
                {...mProps}
            >
                {loading ? (
                    <CircularProgress color="inherit" size={20} />
                ) : (
                    <IconComponent sx={sxIcon} />
                )}
            </IconButton>
        );
    }
);

Icon.displayName = "KButton.Icon";

export type { KButtonIconProps };
export default memo(Icon);

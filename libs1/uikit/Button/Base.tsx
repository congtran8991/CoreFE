import { Button, CircularProgress, Icon } from "@mui/material";
import React, { CSSProperties, memo, useMemo } from "react";
import styleHelper from "../styleHelper";
import { KButtonProps, KButtonSize, KKind } from "../types";
import KLabel from "../Label";
import { TypeTypography } from "@uikit/typography";
import View from "@uikit/Container/View";
import { KColors } from "@constants-libs";

// ─── Constants (outside component to avoid recreation) ───────────────────────

const OPTIONS_SIZE: Record<NonNullable<KButtonSize>, { height: number; icon: number; text: string; spacing: string }> = {
  xlg: { height: 48, icon: 28, text: 'TextXlg', spacing: '0.5rem' },
  lg: { height: 42, icon: 24, text: 'TextLg', spacing: '0.5rem' },
  md: { height: 39, icon: 22, text: 'TextMd', spacing: '0.5rem' },
  sm: { height: 30, icon: 18, text: 'TextSm', spacing: '0.5rem' },
  xs: { height: 26, icon: 16, text: 'TextXs', spacing: '0.5rem' },
};

const OPTIONS_TYPO: Record<'bold' | 'medium' | 'normal', string> = {
  bold: 'Bold',
  medium: 'Medium',
  normal: 'Normal',
};

/** Safe hover color lookup — only KKind keys that have `.alpha` */
const HOVER_BY_KIND: Record<KKind, string> = {
  primary: KColors.primary.alpha[8],
  secondary: KColors.secondary.alpha[8],
  success: KColors.success.alpha[8],
  danger: KColors.danger.alpha[8],
  info: KColors.info.alpha[8],
  warning: KColors.warning.alpha[8],
};

// ─── Component ────────────────────────────────────────────────────────────────

const Base = React.forwardRef<HTMLButtonElement, KButtonProps>(
  (props, ref) => {
    const {
      variant = "contained",
      size = 'md',
      textColor,
      iconColor,
      loading = false,
      loadingText,
      fullWidth = false,
      disabled,
      iconStart: IconStart,
      iconEnd: IconEnd,
      children,
      style,
      title,
      weight = 'bold',
      sx,
      kind = 'primary',
      ...rest
    } = props;

    const { height, icon, text, spacing } = OPTIONS_SIZE[size];

    const textTypo = useMemo(
      () => `${text}${OPTIONS_TYPO[weight]}` as TypeTypography,
      [text, weight]
    );

    const { mStyle, mProps } = styleHelper.destructStyles(rest);

    const styledButton: CSSProperties = useMemo(() => {
      const base: CSSProperties = {
        ...mStyle.layout,
        ...mStyle.spacing,
        ...mStyle.textStyle,
        ...mStyle.styling,
        ...style,
        opacity: disabled ? 0.5 : 1,
        height,
        ...(title ? { minWidth: height } : { width: height }),
      };
      return base;
    }, [mStyle, style, disabled, height, title]);

    return (
      <Button
        ref={ref}
        variant={variant}
        fullWidth={fullWidth}
        disabled={disabled || loading}
        style={styledButton}
        sx={{
          '&:focus': { outline: 'none', boxShadow: 'none' },
          '&.Mui-focusVisible': { outline: 'none', boxShadow: 'none' },
          '&:hover': { backgroundColor: HOVER_BY_KIND[kind] },
          ...sx,
        }}
        {...mProps}
      >
        <View display="flex" alignItems="center" justifyContent="center" gap={spacing}>
          {IconStart && <Icon component={IconStart} sx={{ fontSize: icon, color: iconColor || textColor }} />}
          {title && <KLabel.Text typo={textTypo} color={textColor} textTransform="uppercase">{title}</KLabel.Text>}
          {IconEnd && <Icon component={IconEnd} sx={{ fontSize: icon, color: iconColor || textColor }} />}
        </View>

        {loading && (
          <CircularProgress
            color="inherit"
            size={icon}
            sx={{ mr: loadingText ? '0.5rem' : 0, position: 'absolute', transform: 'translate(-50%, -50%)' }}
          />
        )}
        {loading && loadingText}
      </Button>
    );
  },
);

Base.displayName = "KButton.Base";

export default memo(Base);

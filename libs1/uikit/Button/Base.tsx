import { Button, CircularProgress, Icon } from "@mui/material";
import React, { CSSProperties, memo, useMemo } from "react";
import styleHelper from "../styleHelper";
import { KButtonProps, KButtonSize, KKind } from "../types";
import KLabel from "../Label";
import { set } from 'lodash';
import { TypeTypography } from "@uikit/typography";
import View from "@uikit/Container/View";
import { KColors } from "@constants-libs";



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

    const { height, icon, text, spacing } = useMemo(() => {
      const OPTIONS_SIZE: Record<NonNullable<KButtonSize>, any> = {
        xlg: {
          height: 48,
          icon: 28,
          text: 'TextXlg',
          spacing: '0.5rem'
        },
        lg: {
          height: 42,
          icon: 24,
          text: 'TextLg',
          spacing: '0.5rem'
        },
        md: {
          height: 39,
          icon: 22,
          text: 'TextMd',
          spacing: '0.5rem'
        },
        sm: {
          height: 30,
          icon: 18,
          text: 'TextSm',
          spacing: '0.5rem'
        },
        xs: {
          height: 26,
          icon: 16,
          text: 'TextXs',
          spacing: '0.5rem'
        },
      }


      return OPTIONS_SIZE[size]
    }, [size])

    const textTypo = useMemo(() => {
      const OPTIONS_TYPO: Record<'bold' | 'medium' | 'normal', string> = {
        bold: 'Bold',
        medium: 'Medium',
        normal: 'Normal'
      }

      return `${text}${OPTIONS_TYPO[weight]}` as TypeTypography

    }, [text, weight])

    const { mStyle, mProps } = styleHelper.destructStyles(rest);

    const { innerStyle, innerProps } = useMemo(() => {
      const innerStyle = {
        ...mStyle.layout,
        ...mStyle.spacing,
        ...mStyle.textStyle,
        ...mStyle.styling,
        ...style,
      };
      return { innerStyle, innerProps: mProps };
    }, [mProps, mStyle.layout, mStyle.spacing, mStyle.styling, mStyle.textStyle, style]);

    const commonStyle = useMemo(() => {
      const r = {
        ...innerStyle
      }

      set(r, 'opacity', disabled ? 0.5 : 1);

      return r
    }, [disabled, innerStyle])

    const styledButton: CSSProperties = useMemo(() => {
      const clone = { ...commonStyle };

      set(clone, 'height', height);

      if (!title) {
        set(clone, 'width', height);
      } else {
        set(clone, 'minWidth', height);
      }

      return clone;
    }, [commonStyle, height, title]);

    const renderLoading = useMemo(() => {
      return (
        <>
          <CircularProgress
            color="inherit"
            size={icon}
            sx={{
              mr: loadingText ? "0.5rem" : 0, position: 'absolute',
              transform: 'translate(-50%, -50%)'
            }}
          />
          {loadingText}
        </>
      );
    }, [icon, loadingText]);

    return (
      <Button
        ref={ref}
        variant={variant}
        fullWidth={fullWidth}
        disabled={disabled || loading}
        style={{ ...styledButton }}
        sx={{
          '&:focus': { outline: 'none', boxShadow: 'none' },
          '&.Mui-focusVisible': { outline: 'none', boxShadow: 'none' },
          '&:hover': { backgroundColor: KColors[kind as keyof typeof KColors].alpha[8] },
          ...sx
        }}
        {...innerProps}
      >
        <View display="flex" alignItems="center" justifyContent="center" gap={spacing}>
          {IconStart && <Icon component={IconStart} sx={{ fontSize: icon, color: iconColor || textColor }} />}
          {title && <KLabel.Text typo={textTypo} color={textColor} textTransform="uppercase">{title}</KLabel.Text>}
          {IconEnd && <Icon component={IconEnd} sx={{ fontSize: icon, color: iconColor || textColor }} />}
        </View>

        {loading && (
          renderLoading
        )}
      </Button>
    );
  },
);

Base.displayName = "KButton.Base";

export default memo(Base);

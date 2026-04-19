import { BoxProps, ButtonProps, SlotProps, SvgIconTypeMap, SxProps, TooltipProps } from "@mui/material";
import { RootColors } from "../constants/color";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { JSX } from "react";
import { TypeTypography } from "./typography";

export type KButtonSize = 'xlg' | 'lg' | 'md' | 'sm' | 'xs';

export type KButtonLabelWeight = 'normal' | 'medium' | 'bold';

export type KKind = 'primary' | 'secondary' | 'success' | 'danger' | 'info' | 'warning';

export type KRadius =
  | 'x' // 4px
  | '2x' // 8px
  | '3x' // 12px
  | '4x' // 16px
  | '6x' // 24px
  | 'round'; // round

export type SizeSpacing =
  | "0rem"
  | "0.25rem"
  | "0.5rem"
  | "0.75rem"
  | "1rem"
  | "1.25rem"
  | "1.5rem"
  | "1.75rem"
  | "2rem"
  | "2.5rem"
  | "3rem"
  | "3.5rem"
  | "4rem"
  | "5rem"
  | "6rem"
  | "8rem"
  | "10rem"
  | "12rem"
  | "14rem"
  | "16rem";

export type SizeText =
  | "0.25rem"
  | "0.5rem"
  | "0.75rem"
  | "0.875rem"
  | "1rem"
  | "1.25rem"
  | "1.5rem"
  | "1.75rem"
  | "2rem"
  | "2.25rem"
  | "2.5rem";

export type TypeWeight =
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "bold";


export interface TypeStyling {
  background?: string;
  opacity?: number;
  overflow?: boolean | 'unset' | 'hidden' | 'auto' | 'scroll';
  overflowX?: boolean | 'unset' | 'hidden' | 'auto' | 'scroll';
  overflowY?: boolean | 'unset' | 'hidden' | 'auto' | 'scroll';

  br?: KRadius | 0; // border radius
  brW?: number; // border width
  brC?: string; // border color
  brS?: 'solid' | 'dashed'; // border style

  brTL?: KRadius | 0; // border top left radius
  brTR?: KRadius | 0; // border top right radius
  brBL?: KRadius | 0; // border bottom left radius
  brBR?: KRadius | 0; // border bottom right radius

  brBW?: number | 0; // border bottom width
  brTW?: number | 0; // border top width
  brLW?: number | 0; // border left width
  brRW?: number | 0; // border right width

  brBC?: string; // border bottom color
  brTC?: string; // border top color
  brLC?: string; // border left color
  brRC?: string; // border right color

  pointer?: boolean;
}

export interface TypeSpacing {
  mr?: SizeSpacing;
  mrX?: SizeSpacing;
  mrY?: SizeSpacing;
  mrL?: SizeSpacing;
  mrR?: SizeSpacing;
  mrT?: SizeSpacing;
  mrB?: SizeSpacing;
  pd?: SizeSpacing;
  pdX?: SizeSpacing;
  pdY?: SizeSpacing;
  pdL?: SizeSpacing;
  pdR?: SizeSpacing;
  pdT?: SizeSpacing;
  pdB?: SizeSpacing;
}

export interface TypeLayout {
  dp?: "inline" | "block" | "flex" | "inline-block" | "inline-flex" | "none";
  flex?: number | true; // flex value, if flex === true, it means flex = 1
  flexS?: number; // flexShirk
  flexG?: number; // flexGrow
  flexW?: "wrap" | "nowrap" | "wrap-reverse";
  row?: boolean;
  reverse?: boolean;
  alignItems?:
  | true
  | "flex-start"
  | "flex-end"
  | "center"
  | "stretch"
  | "baseline";
  alignSelf?:
  | true
  | "auto"
  | "flex-start"
  | "flex-end"
  | "center"
  | "stretch"
  | "baseline";
  justifyContent?:
  | true
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";
  center?: boolean;
  direction?: "row" | "column";
  position?: "relative" | "absolute" | "fixed" | "static" | "sticky";
}

export type TypeKColors = `var(${RootColors})`;

export interface TypeStyleText {
  lineHeight?: SizeSpacing;
  color?: string | TypeKColors;
  fontWeight?: TypeWeight;
  fontSize?: SizeText;
  textAlign?: "left" | "center" | "right" | "justify";
  textTransform?: "none" | "capitalize" | "uppercase" | "lowercase";
  typo?: TypeTypography;
}

export type TypeIcon = OverridableComponent<SvgIconTypeMap<object, "svg">>;

export interface KInputProps extends TypeSpacing {
  style?: React.CSSProperties;
  className?: string;
  label?: string;
  onChange?: (v?: any) => void;
  onFocus?: (v?: any) => void;
  onBlur?: (v?: any) => void;
  onKeyDown?: (v?: any) => void;
  value?: string | number | boolean | null | any[];
  message?: string;
  size?: "small" | "medium";
  name?: string;
  error?: boolean;
  type?: React.HTMLInputTypeAttribute;
  sx?: SxProps;
  fullWidth?: boolean;
  disabled?: boolean;
  required?: boolean;
  slotProps?: SlotProps<any, any, any>;
  inputLabel?: {
    shrink: boolean;
  };
  horizontal?: boolean;
  options?: { label: string; value: string | number | boolean }[];
  multiple?: boolean;
}

export type PropsWithChildren = React.PropsWithChildren<
  Omit<React.HTMLAttributes<HTMLDivElement>, "size" | "ref">
>

export interface KCardProps extends PropsWithChildren {
  isLoading?: boolean;
  header?: TypeStyleText & {
    title: string;
    icon?: TypeIcon;
    bgColorIcon?: string | TypeKColors;
    sxIcon?: any;
    renderHeader?: () => any;
    content?: JSX.Element;
    maxHeight?: number;
    border?: boolean;
  };
  size?: 'lg' | 'md' | 'nm' | 'sm' | 'xs';
  typo?: TypeTypography;
}

export interface KContainerViewProps
  extends Omit<BoxProps<"div">, "mr">, TypeSpacing {
  style?: React.CSSProperties;
  className?: string;
  width?: string | number;
  height?: string | number;
  onPress?: (_v?: any) => void;
  sx?: BoxProps<"div">["sx"];
}

export interface KTextProps
  extends PropsWithChildren, TypeSpacing, TypeStyleText, TypeLayout, TypeStyling {
  isParagraph?: boolean;
  onPress?: (e: any) => void;
  style?: React.CSSProperties;
  isTooltip?: boolean;
  tooltip?: string | JSX.Element | React.ReactNode;
  placementTooltip?: TooltipProps['placement'];
  href?: string;
  isLink?: boolean;
}

export type KParagraphProps = Omit<KTextProps, "isParagraph">

export interface KButtonProps
  extends Omit<ButtonProps, "color" | "size">,
  TypeSpacing, TypeStyleText, TypeStyling {
  /** MUI button variant */
  variant?: "contained" | "outlined" | "text";
  /** MUI button size */
  size?: KButtonSize
  /** MUI button label weight */
  weight?: KButtonLabelWeight;
  /** MUI color preset or custom color string */
  color?: "primary" | "secondary" | "success" | "error" | "info" | "warning" | "inherit";
  /** Custom background color (overrides color prop) */
  background?: string | TypeKColors;
  /** Custom text color */
  textColor?: string | TypeKColors;
  iconColor?: string | TypeKColors;
  /** Show loading spinner */
  loading?: boolean;
  /** Loading text, defaults to no text (spinner only) */
  loadingText?: string;
  /** Make button full width */
  fullWidth?: boolean;
  /** Custom icon placed before children */
  iconStart?: TypeIcon;
  /** Custom icon placed after children */
  iconEnd?: TypeIcon,
  /** Kind of button */
  kind?: KKind,
  hasShadow?: boolean;
  hasHover?: boolean;
}

export interface KAutocompleteProps extends KInputProps {
  /** Allow selecting multiple values */
  multiple?: boolean;
  /** Disable the portal (render dropdown inline) */
  disablePortal?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Loading state */
  loading?: boolean;
  /** Disable clearable */
  disableClearable?: boolean;
  /** Free solo mode (allow arbitrary input) */
  freeSolo?: boolean;
  /** Group options by a key */
  groupBy?: (option: any) => string;
  /** Custom render option */
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: any
  ) => React.ReactNode;
  /** Custom filter options */
  filterOptions?: (options: any[], state: any) => any[];
  /** Called when input text changes */
  onInputChange?: (
    event: React.SyntheticEvent,
    value: string,
    reason: string
  ) => void;
}

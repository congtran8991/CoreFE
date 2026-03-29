// import useCombineRefs from "@hooks/lib/useCombineRef";
import { useMemo, useRef } from "react";
import { useCombineRefs } from "../../hooks";
import { KInputProps } from "../types";
import styleHelper from "../styleHelper";

export const useInputProps = (
  props: KInputProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  const { message, error, size = "small", fullWidth, style, ...rest } = props;
  const innerRef = useRef<HTMLInputElement>(null);
  const combineRefs = useCombineRefs<HTMLInputElement>(ref, innerRef);

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

  return {
    combineRefs,
    size,
    error: !!message || error,
    helperText: message,
    fullWidth,
    innerStyle,
    innerProps,
    ...rest,
  };
};

import { forwardRef, memo, useMemo } from "react";
import styleHelper from "../styleHelper";
import { Box } from "@mui/material";
import { KContainerViewProps } from "../types";

const View = forwardRef<HTMLDivElement, KContainerViewProps>((props, ref) => {
  const { style, className, onPress, width, height, lineHeight, sx, ...rest } =
    props;

  const { mStyle, mProps } = styleHelper.destructStyles(rest);

  const { innerStyle, innerProps } = useMemo(() => {
    const innerStyle = {
      ...mStyle.layout,
      ...mStyle.spacing,
      ...mStyle.textStyle,
      ...style,
    };
    return { innerStyle, innerProps: mProps };
  }, []);

  return (
    <Box
      ref={ref}
      style={innerStyle}
      width={width}
      height={height}
      onClick={onPress}
      sx={sx}
      {...innerProps}
    />
  );
});

export default memo(View);

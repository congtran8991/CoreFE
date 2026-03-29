"use client";

import { SxProps } from "@mui/material";
import { memo, MouseEventHandler } from "react";
import KContainer from "../Container";

import { TypeIcon, TypeLayout, TypeSpacing, TypeStyleText } from "../types";
import styleHelper from "../styleHelper";

interface IProps extends TypeStyleText, TypeLayout, TypeSpacing {
  icon: TypeIcon; // Không cần `muiName`
  className?: string;
  sx?: SxProps;
  onPress?: () => void;
}

const KICon: React.FC<IProps> = ({
  icon: IconComponent,
  sx,
  onPress,
  ...rest
}) => {
  if (!IconComponent) {
    console.error("Provided icon is not a valid React component.");
    return null;
  }

  const { mStyle } = styleHelper.destructStyles(rest);

  return (
    <KContainer.View
      className="cursor-pointer"
      onPress={onPress as unknown as MouseEventHandler<HTMLDivElement>}
      {...mStyle.layout}
      {...rest}
    >
      <IconComponent sx={{ ...mStyle.textStyle, display: "flex", alignItems: "center", ...sx }} />
    </KContainer.View>
  );
};

export default memo(KICon);

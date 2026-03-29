import { SxProps, Theme, Typography } from "@mui/material";
import { memo } from "react";

interface IProps {
  label?: string;
  required?: boolean;
  sx?: SxProps<Theme> | undefined;
}

const Label = ({ label = "", required, sx }: IProps) => {
  return (
    <Typography sx={sx}>
      {label} {required && <span style={{ color: "red" }}>*</span>}
    </Typography>
  );
};

export default memo(Label);

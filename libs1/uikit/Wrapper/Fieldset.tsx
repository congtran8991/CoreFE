import { Box } from "@mui/material";
import { JSX, memo } from "react";

interface IProps {
  children?: JSX.Element;
  label?: string;
}

const Fieldset = ({ children, label }: IProps) => {
  return (
    <>
      <Box
        width={"100%"}
        color={"#00000099"}
        fontSize={"0.875rem"}
        fontWeight={400}
      >
        {label}
      </Box>
      <Box width={"100%"} border={1} borderColor={"#b9b5b5"} borderRadius={1}>
        <Box padding={2} paddingTop={3}>
          {children}
        </Box>
      </Box>
    </>
  );
};

export default memo(Fieldset);

import {
  Stack,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import { useInputProps } from "./helpers";
import Label from "./Label";
import { KInputProps } from "../types";

const SelectInput = React.forwardRef<HTMLInputElement, KInputProps>(
  (props, ref) => {
    const {
      name,
      combineRefs,
      options,
      label,
      horizontal = true,
      // eslint-disable-next-line no-unused-vars
      helperText,
      required,
      error,
      innerStyle,
      innerProps,
      ...rest
    } = useInputProps(props, ref);

    return (
      <Stack direction="row" spacing={2} alignItems={"center"}>
        {horizontal && (
          <Label sx={{ minWidth: "10rem" }} required={required} label={label} />
        )}
        <FormControl fullWidth error={error}>
          <InputLabel id={name}>
            {!horizontal ? <Label required={required} label={label} /> : ""}
          </InputLabel>
          <Select
            style={innerStyle}
            labelId={name}
            label={!horizontal ? label : ""}
            ref={combineRefs}
            {...rest}
          >
            {(options || []).map((x) => (
              <MenuItem key={x.label} value={x.value as any}>
                {x.label}
              </MenuItem>
            ))}
          </Select>
          <Typography
            marginLeft={"1rem"}
            marginTop={"0.25rem"}
            fontSize={"0.75rem"}
            color="#d32f2f"
          >
            {helperText}
          </Typography>
        </FormControl>
      </Stack>
    );
  },
);

export default memo(SelectInput);

import { Stack, TextField } from "@mui/material";
import React, { memo } from "react";
import { useInputProps } from "./helpers";
import Label from "./Label";

import { KInputProps } from "../types";

const BaseInput = React.forwardRef<HTMLInputElement, KInputProps>(
  (props, ref) => {
    const {
      name,
      combineRefs,
      sx,
      inputLabel,
      required,
      fullWidth = true,
      slotProps,
      type,
      horizontal = true,
      label,
      innerStyle,
      innerProps,
      ...rest
    } = useInputProps(props, ref);

    return (
      <Stack direction="row" spacing={2} alignItems={"center"}>
        {horizontal && (
          <Label sx={{ minWidth: "10rem" }} required label={label} />
        )}
        <TextField
          id={name}
          color="info"
          // style={innerStyle}
          inputRef={combineRefs}
          type={type}
          slotProps={{
            input: { sx },
            inputLabel,
            ...slotProps,
          }}
          label={!horizontal ? label : ""}
          required={required}
          fullWidth={fullWidth}
          {...rest}
        />
      </Stack>
    );
  },
);

BaseInput.displayName = "BaseInput";

export default memo(BaseInput);

import React, { memo, useCallback, useState } from "react";
import { useInputProps } from "./helpers";
import Base from "./Base";
import { Box, Chip } from "@mui/material";
import { KInputProps } from "../types";

const Multiple = React.forwardRef<HTMLInputElement, KInputProps>(
  (props, ref) => {
    const {
      name,
      combineRefs,
      sx,
      inputLabel,
      required,
      fullWidth = true,
      slotProps,
      horizontal = true,
      label,
      onKeyDown,
      value,
      onBlur,
      onChange,
      innerStyle,
      innerProps,
      ...rest
    } = useInputProps(props, ref);

    const [data, setData] = useState<any[]>((value as any[]) || []);

    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.keyCode === 13) {
          event.preventDefault();
          const inputValue = (event.target as any)?.value?.trim();

          setData((pre) => {
            return [...pre, inputValue];
          });
          onKeyDown?.([...data, inputValue]);

          (event.target as any).value = "";
        }
      },
      [data, onKeyDown],
    );

    const handleBlur = useCallback(
      (
        e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
      ) => {
        e.target.value = "";
        onBlur?.(e);
      },
      [onBlur],
    );

    const handleDelete = useCallback(
      (index: number) => {
        setData((pre) => {
          onKeyDown?.(pre.filter((_, _i) => _i !== index));
          return pre.filter((_, _i) => _i !== index);
        });
      },
      [onKeyDown],
    );

    return (
      <Base
        ref={combineRefs}
        style={innerStyle}
        label={label}
        name={name}
        onKeyDown={handleKeyDown}
        horizontal={horizontal}
        fullWidth={fullWidth}
        required={required}
        onBlur={handleBlur}
        slotProps={{
          input: {
            sx: {
              flexWrap: "wrap",
              ...sx,
            },
            startAdornment: (
              <ListItemChipInput data={data} onDelete={handleDelete} />
            ),
          },
          inputLabel,
          ...slotProps,
        }}
        {...rest}
        // onChange={() => {}}
      />
    );
  },
);

export default memo(Multiple);

export const ListItemChipInput = ({
  data = [],
  onDelete,
}: {
  data: any[];
  // eslint-disable-next-line no-unused-vars
  onDelete: (i: number) => void;
}) => {
  return (
    <Box display={"flex"} flexWrap={"wrap"} width={"max-content"}>
      {(data || [])?.map((x: string, i) => (
        <Box margin={0.5} key={i}>
          <Chip
            label={x}
            size="small"
            onDelete={() => {
              onDelete(i);
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

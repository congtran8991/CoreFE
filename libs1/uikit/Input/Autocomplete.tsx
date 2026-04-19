import {
    Autocomplete as MUIAutocomplete,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import React, { memo, useCallback } from "react";
import { useInputProps } from "./helpers";
import Label from "./Label";
import { KAutocompleteProps } from "../types";



const AutocompleteInput = React.forwardRef<HTMLInputElement, KAutocompleteProps>(
    (props, ref) => {
        const {
            name,
            combineRefs,
            options = [],
            label,
            horizontal = false,
            helperText,
            required,
            error,
            innerStyle,
            innerProps,
            multiple = false,
            disablePortal = false,
            placeholder,
            loading = false,
            disableClearable = false,
            freeSolo = false,
            groupBy,
            renderOption,
            filterOptions,
            onInputChange,
            value,
            onChange,
            fullWidth = true,
            size,
            ...rest
        } = useInputProps(props, ref) as ReturnType<typeof useInputProps> &
        KAutocompleteProps;

        const handleChange = useCallback(
            (_event: React.SyntheticEvent, newValue: any) => {
                if (onChange) {
                    if (newValue === null) {
                        onChange(multiple ? [] : undefined);
                    } else if (typeof newValue === "object" && !Array.isArray(newValue)) {
                        onChange(newValue.value);
                    } else if (Array.isArray(newValue)) {
                        onChange(newValue.map((v: any) => (typeof v === "object" ? v.value : v)));
                    } else {
                        onChange(newValue);
                    }
                }
            },
            [onChange, multiple]
        );

        const selectedValue = multiple
            ? (options || []).filter((opt: any) =>
                Array.isArray(value) ? value.includes(opt.value) : false
            )
            : (options || []).find((opt: any) => opt.value === value) ?? null;

        return (
            <Stack direction="row" spacing={2} alignItems={"center"}>
                {horizontal && (
                    <Label required={required} label={label} />
                )}
                <MUIAutocomplete
                    multiple={multiple}
                    options={options}
                    value={selectedValue}
                    onChange={handleChange}
                    onInputChange={onInputChange}
                    getOptionLabel={(option: any) =>
                        typeof option === "string" ? option : option?.label ?? ""
                    }
                    isOptionEqualToValue={(option: any, val: any) =>
                        option?.value === val?.value
                    }
                    disablePortal={disablePortal}
                    disableClearable={disableClearable}
                    freeSolo={freeSolo}
                    loading={loading}
                    groupBy={groupBy}
                    renderOption={renderOption}
                    filterOptions={filterOptions}
                    fullWidth={fullWidth}
                    size={size}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            name={name}
                            inputRef={combineRefs}
                            label={!horizontal ? label : ""}
                            required={required}
                            error={error}
                            placeholder={placeholder}
                            style={innerStyle}
                        />
                    )}
                />
                {helperText && (
                    <Typography
                        marginLeft={"1rem"}
                        marginTop={"0.25rem"}
                        fontSize={"0.75rem"}
                        color="#d32f2f"
                    >
                        {helperText}
                    </Typography>
                )}
            </Stack>
        );
    }
);

AutocompleteInput.displayName = "AutocompleteInput";

export type { KAutocompleteProps };
export default memo(AutocompleteInput);

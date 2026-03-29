import { Grid } from "@mui/material";
import { Fragment, memo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { IDatasets } from "../../helpers";
import { KInput } from "@uikit";

const FilterStep = ({ index }: { index: number }) => {
  const methods = useFormContext<IDatasets>();

  return (
    <Fragment>
      <Grid size={{ xs: 11.2 }}>
        <Controller
          key={`steps.${index}.expression`}
          name={`steps.${index}.expression`}
          control={methods.control}
          render={({ field, fieldState: { error } }) => {
            return (
              <KInput.Multiple
                {...field}
                label="expression"
                size="small"
                onKeyDown={(v: string[]) => {
                  methods.setValue(`steps.${index}.expression`, v);
                }}
                required
                message={error?.message}
              />
            );
          }}
        />
      </Grid>
    </Fragment>
  );
};

export default memo(FilterStep);

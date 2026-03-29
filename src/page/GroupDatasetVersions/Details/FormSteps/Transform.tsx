import { Grid } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { IDatasets } from "../../helpers";
import { KInput } from "@uikit";
import { Fragment, memo } from "react";

const Transform = ({ index }: { index: number }) => {
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
              <KInput.Base
                {...field}
                label="expression"
                size="small"
                required
                message={error?.message}
              />
            );
          }}
        />
      </Grid>

      <Grid size={{ xs: 11.2 }}>
        <Controller
          key={`steps.${index}.col`}
          name={`steps.${index}.col`}
          control={methods.control}
          render={({ field, fieldState: { error } }) => {
            return (
              <KInput.Base
                {...field}
                label="col"
                size="small"
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

export default memo(Transform);

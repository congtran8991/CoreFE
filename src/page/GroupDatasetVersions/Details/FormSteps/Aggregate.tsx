import { Grid } from "@mui/material";
import { Fragment, memo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { IDatasets } from "../../helpers";
import { KInput } from "@uikit";

const Aggregate = ({ index }: { index: number }) => {
  const methods = useFormContext<IDatasets>();

  return (
    <Fragment>
      <Grid size={{ xs: 11.2 }}>
        <Controller
          key={`steps.${index}.group_by`}
          name={`steps.${index}.group_by`}
          control={methods.control}
          render={({ field, fieldState: { error } }) => {
            return (
              <KInput.Multiple
                {...field}
                label="group_by"
                size="small"
                onKeyDown={(v: string[]) => {
                  methods.setValue(`steps.${index}.group_by`, v);
                }}
                required
                message={error?.message}
              />
            );
          }}
        />
      </Grid>

      <Grid size={{ xs: 11.2 }}>
        <Controller
          key={`steps.${index}.agg_functions`}
          name={`steps.${index}.agg_functions`}
          control={methods.control}
          render={({ field, fieldState: { error } }) => {
            return (
              <KInput.Multiple
                {...field}
                label="agg_functions"
                size="small"
                onKeyDown={(v: string[]) => {
                  methods.setValue(`steps.${index}.agg_functions`, v);
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

export default memo(Aggregate);

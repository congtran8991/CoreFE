import { Grid } from "@mui/material";
import { Fragment, memo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { IDatasets } from "../../helpers";
import { KInput } from "@uikit";

const DropColumns = ({ index }: { index: number }) => {
  const methods = useFormContext<IDatasets>();

  return (
    <Fragment>
      <Grid size={{ xs: 11.2 }}>
        <Controller
          key={`steps.${index}.col`}
          name={`steps.${index}.col`}
          control={methods.control}
          render={({ field, fieldState: { error } }) => {
            return (
              <KInput.Multiple
                {...field}
                label="col"
                size="small"
                onKeyDown={(v: string[]) => {
                  methods.setValue(`steps.${index}.col`, v);
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

export default memo(DropColumns);

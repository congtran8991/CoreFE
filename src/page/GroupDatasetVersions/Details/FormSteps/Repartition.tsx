import { Grid, SelectChangeEvent } from "@mui/material";
import { memo } from "react";

import { Controller, useFormContext, useWatch } from "react-hook-form";
import { IDatasets } from "../../helpers";
import { KInput, KWrapper } from "@uikit";
import { generateOptions } from "@constants/option";
import { EnumTypeOptionsRepartition } from "@constants/enum";

const Repartition = ({ index }: { index: number }) => {
  const methods = useFormContext<IDatasets>();
  const [typeOption] = useWatch({
    control: methods.control,
    name: [`steps.${index}.typeOptionRepartition`],
  });

  return (
    <Grid size={{ xs: 11.2 }}>
      <KWrapper.Fieldset label="Options">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Controller
              key={`steps.${index}.typeOptionRepartition`}
              name={`steps.${index}.typeOptionRepartition`}
              control={methods.control}
              render={({ field }) => (
                <KInput.Select
                  {...field}
                  label="Type"
                  options={generateOptions(EnumTypeOptionsRepartition)}
                  onChange={(e: SelectChangeEvent<string>) => {
                    field.onChange(e);
                    methods.setValue(`steps.${index}.options`, undefined);
                  }}
                />
              )}
            />
          </Grid>

          {typeOption === EnumTypeOptionsRepartition.BY_NUMBER && (
            <Grid size={{ xs: 12 }}>
              <Controller
                key={`steps.${index}.options.partition_num`}
                name={`steps.${index}.options.partition_num`}
                control={methods.control}
                render={({ field, fieldState: { error } }) => (
                  <KInput.Base
                    {...field}
                    required
                    label="Partition Num"
                    message={error?.message}
                  />
                )}
              />
            </Grid>
          )}

          {typeOption === EnumTypeOptionsRepartition.BY_COLUMNS && (
            <Grid size={{ xs: 12 }}>
              <Controller
                key={`steps.${index}.options.partition_cols`}
                name={`steps.${index}.options.partition_cols`}
                control={methods.control}
                render={({ field, fieldState: { error } }) => (
                  <KInput.Base
                    {...field}
                    required
                    label="Partition Cols"
                    message={error?.message}
                  />
                )}
              />
            </Grid>
          )}
        </Grid>
      </KWrapper.Fieldset>
    </Grid>
  );
};

export default memo(Repartition);

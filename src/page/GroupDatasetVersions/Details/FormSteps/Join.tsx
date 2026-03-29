import { Grid } from "@mui/material";
import { Fragment, memo } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { generateOptionsListDataset, IDatasets } from "../../helpers";
import { KInput, KWrapper } from "@uikit";
import { generateOptions } from "@constants/option";
import { EnumJoinType } from "@constants/enum";

const StepJoin = ({ index }: { index: number }) => {
  const methods = useFormContext<IDatasets>();
  const [listDatasets, nameDataset] = useWatch({
    control: methods.control,
    name: ["listDatasets", "name"],
  });

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

      <Grid size={{ xs: 11.2 }}>
        <KWrapper.Fieldset label="Options">
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Controller
                key={`steps.${index}.options.join_type`}
                name={`steps.${index}.options.join_type`}
                control={methods.control}
                render={({ field }) => (
                  <KInput.Select
                    {...field}
                    label="Join Type"
                    options={generateOptions(EnumJoinType)}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Controller
                key={`steps.${index}.options.with_dataset`}
                name={`steps.${index}.options.with_dataset`}
                control={methods.control}
                render={({ field, fieldState: { error } }) => (
                  <KInput.Select
                    {...field}
                    label="With Dataset"
                    options={generateOptionsListDataset(
                      listDatasets,
                      nameDataset
                    )}
                    required
                    message={error?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </KWrapper.Fieldset>
      </Grid>
    </Fragment>
  );
};

export default memo(StepJoin);

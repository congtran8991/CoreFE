import { Grid } from "@mui/material";
import { memo } from "react";
import { KInput, KWrapper } from "@uikit";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { generateOptionsListDataset, IDatasets } from "../../helpers";

const Union = ({ index }: { index: number }) => {
  const methods = useFormContext<IDatasets>();
  const [listDatasets, nameDataset] = useWatch({
    control: methods.control,
    name: ["listDatasets", "name"],
  });

  return (
    <Grid size={{ xs: 11.2 }}>
      <KWrapper.Fieldset label="Options">
        <Grid container spacing={2}>
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
  );
};

export default memo(Union);

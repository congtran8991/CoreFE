import { Grid } from "@mui/material";
import { memo } from "react";

import { Controller, useFormContext, useWatch } from "react-hook-form";
import { generateOptionsListDataset, IDatasets } from "../../helpers";
import { KInput, KWrapper } from "@uikit";

const Except = ({ index }: { index: number }) => {
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
              render={({ field }) => (
                <KInput.Select
                  {...field}
                  label="With Dataset"
                  options={generateOptionsListDataset(
                    listDatasets,
                    nameDataset
                  )}
                />
              )}
            />
          </Grid>
        </Grid>
      </KWrapper.Fieldset>
    </Grid>
  );
};

export default memo(Except);

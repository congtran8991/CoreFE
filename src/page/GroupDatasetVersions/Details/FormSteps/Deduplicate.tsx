import { Grid } from "@mui/material";
import { memo } from "react";

import { Controller, useFormContext, useWatch } from "react-hook-form";
import { IDatasets } from "../../helpers";

import { generateOptions } from "@constants/option";
import { EnumTypeOptionsDuplicate } from "@constants/enum";
import { KInput, KWrapper } from "@uikit";

const Duplicate = ({ index }: { index: number }) => {
  const methods = useFormContext<IDatasets>();
  const [typeOption] = useWatch({
    control: methods.control,
    name: [`steps.${index}.typeOptionDuplicate`],
  });

  return (
    <Grid size={{ xs: 11.2 }}>
      <KWrapper.Fieldset label="Options">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Controller
              key={`steps.${index}.typeOptionDuplicate`}
              name={`steps.${index}.typeOptionDuplicate`}
              control={methods.control}
              render={({ field }) => (
                <KInput.Select
                  {...field}
                  label="Type"
                  options={generateOptions(EnumTypeOptionsDuplicate)}
                  onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
                    field.onChange(e);
                    const val = e?.target?.value as EnumTypeOptionsDuplicate;
                    if (val === EnumTypeOptionsDuplicate.SELECTED_COLUMNS) {
                      methods.setValue(`steps.${index}.col`, []);
                    } else {
                      methods.setValue(`steps.${index}.col`, ["*"]);
                    }
                  }}
                />
              )}
            />
          </Grid>

          {typeOption === EnumTypeOptionsDuplicate.SELECTED_COLUMNS && (
            <Grid size={{ xs: 12 }}>
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
          )}
        </Grid>
      </KWrapper.Fieldset>
    </Grid>
  );
};

export default memo(Duplicate);

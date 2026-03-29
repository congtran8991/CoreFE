import { Grid, SelectChangeEvent } from "@mui/material";
import { memo, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { generateOptions } from "@constants/option";
import { EnumTypeStep } from "@constants/enum";
import { KInput } from "@uikit";
import { defaultStep, IDatasets } from "../../helpers";

const TypeStep = ({ index }: { index: number }) => {
  const methods = useFormContext<IDatasets>();

  const OPTIONS_DEFAULT_VALUE = useMemo(() => {
    const res = {
      [EnumTypeStep.select]: defaultStep,
      [EnumTypeStep.filter]: defaultStep,
      [EnumTypeStep.transform]: defaultStep,
      [EnumTypeStep.aggregate]: defaultStep,
      [EnumTypeStep.deduplicate]: { ...defaultStep, col: ["*"] },
      [EnumTypeStep.dropcolumns]: defaultStep,
      [EnumTypeStep.except]: defaultStep,
      [EnumTypeStep.join]: defaultStep,
      [EnumTypeStep.union]: defaultStep,
      [EnumTypeStep.repartition]: defaultStep,
    };

    return res;
  }, []);

  return (
    <Grid size={{ xs: 11.2 }}>
      <Controller
        key={`steps.${index}.type`}
        name={`steps.${index}.type`}
        control={methods.control}
        render={({ field }) => (
          <KInput.Select
            {...field}
            label="Type"
            options={generateOptions(EnumTypeStep)}
            onChange={(e: SelectChangeEvent<EnumTypeStep>) => {
              const type = e.target.value as EnumTypeStep;
              methods.setValue(`steps.${index}`, OPTIONS_DEFAULT_VALUE[type]);
              field.onChange(e);
            }}
          />
        )}
      />
    </Grid>
  );
};

export default memo(TypeStep);

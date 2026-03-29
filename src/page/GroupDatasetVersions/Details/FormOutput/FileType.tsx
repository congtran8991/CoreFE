import { Fragment, memo, useMemo } from "react";
import { Grid } from "@mui/material";

import { Controller, useFormContext, useWatch } from "react-hook-form";

import { IDatasets } from "../../helpers";
import { generateOptions } from "@constants/option";
import {
  EnumModeInput,
  EnumWriteModeOutput,
  EnumFormatOutput,
} from "@constants/enum";
import { KInput, KWrapper } from "@uikit";

const DatasourceFileOutput = () => {
  const methods = useFormContext<IDatasets>();

  const [outputFormat] = useWatch({
    control: methods.control,
    name: ["output.format"],
  });

  const OPTIONS = useMemo(() => {
    return {
      [EnumFormatOutput.CSV]: <OptionCSV />,
      [EnumFormatOutput.PARQUET]: <OptionsParquet />,
    };
  }, []);

  return (
    <Fragment>
      <Grid size={{ xs: 12 }}>
        <Controller
          key={`output.format`}
          name={`output.format`}
          control={methods.control}
          render={({ field }) => (
            <KInput.Select
              {...field}
              label="Format"
              options={generateOptions(EnumFormatOutput)}
            />
          )}
        />
      </Grid>

      {OPTIONS[outputFormat as EnumFormatOutput]}
    </Fragment>
  );
};

export default memo(DatasourceFileOutput);

export const OptionCSV = memo(() => {
  const methods = useFormContext<IDatasets>();

  return (
    <Fragment>
      <Grid size={{ xs: 12 }}>
        <Controller
          key={`output.path`}
          name={`output.path`}
          control={methods.control}
          render={({ field, fieldState: { error } }) => (
            <KInput.Base
              {...field}
              size="small"
              label="Path"
              message={error?.message}
              inputLabel={{ shrink: true }}
              required
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Controller
          name={`output.write_mode`}
          control={methods.control}
          render={({ field }) => (
            <KInput.Select
              {...field}
              size="small"
              label="Write Mode"
              options={generateOptions(EnumWriteModeOutput)}
            />
          )}
        />
      </Grid>

      <KWrapper.Fieldset label="Options">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Controller
              key={`output.options.header`}
              name={`output.options.header`}
              control={methods.control}
              render={({ field }) => (
                <KInput.Select
                  {...field}
                  label="Header"
                  options={generateOptions({ TRUE: 1, FALSE: 0 })}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name={`output.options.delimiter`}
              control={methods.control}
              render={({ field, fieldState: { error } }) => (
                <KInput.Base
                  {...field}
                  size="small"
                  label="Delimiter"
                  required
                  inputLabel={{ shrink: true }}
                  message={error?.message}
                />
              )}
            />
          </Grid>
        </Grid>
      </KWrapper.Fieldset>
    </Fragment>
  );
});

export const OptionsParquet = memo(() => {
  const methods = useFormContext<IDatasets>();

  const [datetimeRebaseMode] = useWatch({
    control: methods.control,
    name: ["output.options.datetimeRebaseMode"],
  });

  return (
    <Fragment>
      <Grid size={{ xs: 12 }}>
        <Controller
          key={`output.path`}
          name={`output.path`}
          control={methods.control}
          render={({ field, fieldState: { error } }) => (
            <KInput.Base
              {...field}
              size="small"
              label="Path"
              message={error?.message}
              inputLabel={{ shrink: true }}
              required
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Controller
          name={`output.write_mode`}
          control={methods.control}
          render={({ field }) => (
            <KInput.Select
              {...field}
              size="small"
              label="Write Mode"
              options={generateOptions(EnumWriteModeOutput)}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Controller
          key={`output.partition_by`}
          name={`output.partition_by`}
          control={methods.control}
          render={({ field }) => (
            <KInput.Multiple
              {...field}
              label="partition by"
              size="small"
              onKeyDown={(v: string[]) => {
                methods.setValue(`output.partition_by`, v);
              }}
            />
          )}
        />
      </Grid>

      <KWrapper.Fieldset label="Options">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Controller
              key={`output.options.mergeSchema`}
              name={`output.options.mergeSchema`}
              control={methods.control}
              render={({ field }) => (
                <KInput.Select
                  {...field}
                  label="MergeSchema"
                  options={generateOptions({ TRUE: 1, FALSE: 0 })}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              key={`output.options.parquetBinaryAsString`}
              name={`output.options.parquetBinaryAsString`}
              control={methods.control}
              render={({ field }) => (
                <KInput.Select
                  {...field}
                  label="ParquetBinaryAsString"
                  options={generateOptions({ TRUE: 1, FALSE: 0 })}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              key={`output.options.datetimeRebaseMode`}
              name={`output.options.datetimeRebaseMode`}
              control={methods.control}
              render={({ field }) => (
                <KInput.Select
                  {...field}
                  label="DatetimeRebaseMode"
                  options={generateOptions({ TRUE: 1, FALSE: 0 })}
                />
              )}
            />
          </Grid>

          {datetimeRebaseMode && (
            <Grid size={{ xs: 12 }}>
              <Controller
                key={`output.options.mode`}
                name={`output.options.mode`}
                control={methods.control}
                render={({ field }) => (
                  <KInput.Select
                    {...field}
                    label="Mode"
                    options={generateOptions(EnumModeInput)}
                  />
                )}
              />
            </Grid>
          )}
        </Grid>
      </KWrapper.Fieldset>
    </Fragment>
  );
});

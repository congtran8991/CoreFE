import { Fragment, memo, useMemo } from "react";
import { Checkbox, FormControlLabel, Grid } from "@mui/material";

import { Controller, useFormContext, useWatch } from "react-hook-form";

import { KInput, KWrapper } from "@uikit";
import { IDatasets } from "../../helpers";
import { generateOptions } from "@constants/option";
import { EnumModeInput, EnumFormatInput } from "@constants/enum";

const DatasourceFile = () => {
  const methods = useFormContext<IDatasets>();

  const [inputFormat] = useWatch({
    control: methods.control,
    name: ["input.format"],
  });

  const OPTIONS = useMemo(() => {
    return {
      [EnumFormatInput.CSV]: <OptionCSV />,
      [EnumFormatInput.PARQUET]: <OptionsParquet />,
      [EnumFormatInput.JSON]: <OptionsJSON />,
    };
  }, []);

  return (
    <Fragment>
      <Grid size={{ xs: 12 }}>
        <Controller
          key={`input.format`}
          name={`input.format`}
          control={methods.control}
          render={({ field }) => (
            <KInput.Select
              {...field}
              label="Format"
              options={generateOptions(EnumFormatInput)}
            />
          )}
        />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Controller
          name={`input.path`}
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

      <Grid size={{ xs: 12 }}>{OPTIONS[inputFormat as EnumFormatInput]}</Grid>
    </Fragment>
  );
};

export default memo(DatasourceFile);

export const OptionCSV = memo(() => {
  const methods = useFormContext<IDatasets>();

  const [isHeaderInFileCSV, isSchema] = useWatch({
    control: methods.control,
    name: ["input.isHeaderInFileCSV", "input.isSchema"],
  });

  const isDisabledOptionHeader = useMemo(() => {
    return isHeaderInFileCSV ? true : isSchema;
  }, [isHeaderInFileCSV, isSchema]);

  return (
    <>
      <Grid size={{ xs: 12 }}>
        <Controller
          name={`input.isHeaderInFileCSV`}
          control={methods.control}
          render={({ field }) => (
            <FormControlLabel
              {...field}
              control={
                <Checkbox
                  onChange={(e) => {
                    field.onChange(e);
                    const isHeader = e.target.checked;
                    if (isHeader) {
                      methods.setValue("input.isSchema", false);
                      methods.setValue("input.schema", "");
                      methods.setValue("input.options.header", true);
                    } else {
                      methods.setValue("input.options.header", false);
                    }
                  }}
                />
              }
              label="Header in file CSV ?"
              checked={isHeaderInFileCSV}
            />
          )}
        />
      </Grid>

      {!isHeaderInFileCSV && (
        <Fragment>
          <Grid size={{ xs: 12 }}>
            <Controller
              name={`input.isSchema`}
              control={methods.control}
              render={({ field }) => (
                <FormControlLabel
                  {...field}
                  control={<Checkbox />}
                  label="Need to predefine schema (Nếu click vào thì hiện textbox)"
                  checked={isSchema}
                  onChange={(e) => {
                    // field.onChange(e);
                    methods.setValue("input.isSchema", !isSchema);
                  }}
                />
              )}
            />
          </Grid>

          {isSchema && (
            <Grid size={{ xs: 12 }}>
              <Controller
                name={`input.schema`}
                control={methods.control}
                render={({ field, fieldState: { error } }) => (
                  <KInput.Base
                    {...field}
                    size="small"
                    label="Schema"
                    required={isSchema}
                    message={error?.message}
                    inputLabel={{ shrink: true }}
                  />
                )}
              />
            </Grid>
          )}
        </Fragment>
      )}

      <KWrapper.Fieldset label="Options">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <Controller
              key={`input.options.header`}
              name={`input.options.header`}
              control={methods.control}
              render={({ field }) => (
                <KInput.Select
                  {...field}
                  label="Header"
                  disabled={isDisabledOptionHeader}
                  options={generateOptions({ TRUE: 1, FALSE: 0 })}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name={`input.options.delimiter`}
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
    </>
  );
});

export const OptionsJSON = memo(() => {
  const methods = useFormContext<IDatasets>();

  return (
    <KWrapper.Fieldset label="Options">
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Controller
            key={`input.options.multiLine`}
            name={`input.options.multiLine`}
            control={methods.control}
            render={({ field }) => (
              <KInput.Select
                {...field}
                label="multiLine"
                options={generateOptions({ TRUE: 1, FALSE: 0 })}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Controller
            name={`input.options.encoding`}
            control={methods.control}
            render={({ field, fieldState: { error } }) => (
              <KInput.Base
                {...field}
                size="small"
                label="encoding"
                message={error?.message}
                inputLabel={{ shrink: true }}
                required
              />
            )}
          />
        </Grid>
      </Grid>
    </KWrapper.Fieldset>
  );
});

export const OptionsParquet = memo(() => {
  const methods = useFormContext<IDatasets>();

  const [datetimeRebaseMode] = useWatch({
    control: methods.control,
    name: ["input.options.datetimeRebaseMode"],
  });

  return (
    <KWrapper.Fieldset label="Options">
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Controller
            key={`input.options.mergeSchema`}
            name={`input.options.mergeSchema`}
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
            key={`input.options.parquetBinaryAsString`}
            name={`input.options.parquetBinaryAsString`}
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
            key={`input.options.datetimeRebaseMode`}
            name={`input.options.datetimeRebaseMode`}
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
              key={`input.options.mode`}
              name={`input.options.mode`}
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
  );
});

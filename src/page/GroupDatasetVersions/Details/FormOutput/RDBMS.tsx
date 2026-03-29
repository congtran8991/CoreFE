import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import { Fragment, memo, useMemo } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { IDatasets } from "../../helpers";

import { EnumDataSource, EnumFormatInputRDBMS } from "@constants/enum";
import { generateOptions } from "@constants/option";
import { KInput, KWrapper } from "@uikit";

const RDBMS = () => {
  const methods = useFormContext<IDatasets>();

  const [outputDatastorage, isAdvance] = useWatch({
    control: methods.control,
    name: ["output.dataStorage", "output.options.isAdvance"],
  });

  const portValue = useMemo(() => {
    const OPTIONS: Record<
      Exclude<EnumDataSource, EnumDataSource.FILE | EnumDataSource.HIVE>,
      3306 | 5432 | 1521 | 1433
    > = {
      [EnumDataSource.MYSQL]: 3306,
      [EnumDataSource.POSTGRESQL]: 5432,
      [EnumDataSource.ORACLE]: 1521,
      [EnumDataSource.MS_SQL]: 1433,
    };

    return OPTIONS[outputDatastorage as keyof typeof OPTIONS];
  }, [outputDatastorage]);

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
              disabled
              value={EnumFormatInputRDBMS.JDBC}
              options={generateOptions(EnumFormatInputRDBMS)}
            />
          )}
        />
      </Grid>
      <KWrapper.Fieldset label="Options">
        <Grid container spacing={2}>
          <Grid size={{ xs: 6 }}>
            <Controller
              key={`output.options.dbServerName`}
              name={`output.options.dbServerName`}
              control={methods.control}
              render={({ field, fieldState: { error } }) => (
                <KInput.Base
                  {...field}
                  label="Database Server Name"
                  required
                  message={error?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Controller
              key={`output.options.port`}
              name={`output.options.port`}
              control={methods.control}
              render={({ field, fieldState: { error } }) => (
                <KInput.Base
                  {...field}
                  required
                  label="Port"
                  disabled
                  value={portValue}
                  message={error?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Controller
              key={`output.options.user`}
              name={`output.options.user`}
              control={methods.control}
              render={({ field, fieldState: { error } }) => (
                <KInput.Base
                  {...field}
                  label="Username"
                  required
                  message={error?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Controller
              key={`output.options.password`}
              name={`output.options.password`}
              control={methods.control}
              render={({ field, fieldState: { error } }) => (
                <KInput.Base
                  {...field}
                  label="Password"
                  required
                  message={error?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              key={`output.options.dbName`}
              name={`output.options.dbName`}
              control={methods.control}
              render={({ field, fieldState: { error } }) => (
                <KInput.Base
                  {...field}
                  label="Database Name"
                  required
                  message={error?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              key={`output.options.dbtable`}
              name={`output.options.dbtable`}
              control={methods.control}
              render={({ field, fieldState: { error } }) => (
                <KInput.Base
                  {...field}
                  label="dbtable"
                  required
                  message={error?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Controller
              name={`output.options.isAdvance`}
              control={methods.control}
              render={({ field }) => (
                <FormControlLabel
                  {...field}
                  control={<Checkbox />}
                  label="Advance"
                  checked={isAdvance}
                  onChange={(e) => {
                    methods.setValue("output.options.isAdvance", !isAdvance);
                  }}
                />
              )}
            />
          </Grid>

          {isAdvance && (
            <Fragment>
              <Grid size={{ xs: 12 }}>
                <Controller
                  key={`output.options.queryTimeout`}
                  name={`output.options.queryTimeout`}
                  control={methods.control}
                  render={({ field, fieldState: { error } }) => (
                    <KInput.Base
                      {...field}
                      label="queryTimeout"
                      message={error?.message}
                      required
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Controller
                  key={`output.options.batchsize`}
                  name={`output.options.batchsize`}
                  control={methods.control}
                  render={({ field, fieldState: { error } }) => (
                    <KInput.Base
                      {...field}
                      label="batchsize"
                      message={error?.message}
                      required
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Controller
                  key={`output.options.truncate`}
                  name={`output.options.truncate`}
                  control={methods.control}
                  render={({ field }) => (
                    <KInput.Select
                      {...field}
                      label="truncate"
                      options={generateOptions({ TRUE: 1, FALSE: 0 })}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Controller
                  key={`output.options.numPartitions`}
                  name={`output.options.numPartitions`}
                  control={methods.control}
                  render={({ field, fieldState: { error } }) => (
                    <KInput.Base
                      {...field}
                      label="numPartitions"
                      message={error?.message}
                      required
                    />
                  )}
                />
              </Grid>
            </Fragment>
          )}
        </Grid>
      </KWrapper.Fieldset>
    </Fragment>
  );
};

export default memo(RDBMS);

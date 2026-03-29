import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import { Fragment, memo, useMemo } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { IDatasets } from "../../helpers";
import { EnumDataSource, EnumFormatInputRDBMS } from "@constants/enum";
import { generateOptions } from "@constants/option";
import { KInput, KWrapper } from "@uikit";

const RDBMS = () => {
  const methods = useFormContext<IDatasets>();

  const [
    inputDatasource,
    isAdvance,
    partitionColumn,
    lowerBound,
    upperBound,
    numPartitions,
  ] = useWatch({
    control: methods.control,
    name: [
      "input.dataSource",
      "input.options.isAdvance",
      "input.options.partitionColumn",
      "input.options.lowerBound",
      "input.options.upperBound",
      "input.options.numPartitions",
    ],
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

    return OPTIONS[inputDatasource as keyof typeof OPTIONS];
  }, [inputDatasource]);

  const requiredOptionsWithAdvance = useMemo(() => {
    return !!partitionColumn || !!lowerBound || !!upperBound || !!numPartitions;
  }, [lowerBound, numPartitions, partitionColumn, upperBound]);

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
              key={`input.options.dbServerName`}
              name={`input.options.dbServerName`}
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
              key={`input.options.port`}
              name={`input.options.port`}
              control={methods.control}
              render={({ field }) => (
                <KInput.Base
                  {...field}
                  required
                  label="Port"
                  disabled
                  value={portValue}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Controller
              key={`input.options.user`}
              name={`input.options.user`}
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
              key={`input.options.password`}
              name={`input.options.password`}
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
              key={`input.options.dbName`}
              name={`input.options.dbName`}
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
              key={`input.options.dbtable`}
              name={`input.options.dbtable`}
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
              name={`input.options.isAdvance`}
              control={methods.control}
              render={({ field }) => (
                <FormControlLabel
                  {...field}
                  control={<Checkbox />}
                  label="Advance"
                  checked={isAdvance}
                  onChange={(e) => {
                    methods.setValue("input.options.isAdvance", !isAdvance);
                  }}
                />
              )}
            />
          </Grid>

          {isAdvance && (
            <Fragment>
              <Grid size={{ xs: 12 }}>
                <Controller
                  key={`input.options.partitionColumn`}
                  name={`input.options.partitionColumn`}
                  control={methods.control}
                  render={({ field, fieldState: { error } }) => (
                    <KInput.Base
                      {...field}
                      label="partitionColumn"
                      message={error?.message}
                      required={requiredOptionsWithAdvance}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Controller
                  key={`input.options.lowerBound`}
                  name={`input.options.lowerBound`}
                  control={methods.control}
                  render={({ field, fieldState: { error } }) => (
                    <KInput.Base
                      {...field}
                      label="lowerBound"
                      message={error?.message}
                      required={requiredOptionsWithAdvance}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Controller
                  key={`input.options.upperBound`}
                  name={`input.options.upperBound`}
                  control={methods.control}
                  render={({ field, fieldState: { error } }) => (
                    <KInput.Base
                      {...field}
                      label="upperBound"
                      message={error?.message}
                      required={requiredOptionsWithAdvance}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Controller
                  key={`input.options.numPartitions`}
                  name={`input.options.numPartitions`}
                  control={methods.control}
                  render={({ field, fieldState: { error } }) => (
                    <KInput.Base
                      {...field}
                      label="numPartitions"
                      message={error?.message}
                      required={requiredOptionsWithAdvance}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Controller
                  key={`input.options.fetchsize`}
                  name={`input.options.fetchsize`}
                  control={methods.control}
                  render={({ field, fieldState: { error } }) => (
                    <KInput.Base
                      {...field}
                      label="fetchsize"
                      required
                      message={error?.message}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Controller
                  key={`input.options.queryTimeout`}
                  name={`input.options.queryTimeout`}
                  control={methods.control}
                  render={({ field, fieldState: { error } }) => (
                    <KInput.Base
                      {...field}
                      label="queryTimeout"
                      required
                      message={error?.message}
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

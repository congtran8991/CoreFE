import { Fragment, memo, useMemo } from "react";
import { Box, Checkbox, FormControlLabel, Grid } from "@mui/material";

import { Controller, useFormContext, useWatch } from "react-hook-form";

import { KInput, KWrapper } from "@uikit";
import { defaultOutput, IDatasets } from "../../helpers";
import { generateOptions, OPTIONS_TYPE_DATASOURCE } from "@constants/option";
import { EnumDataSource, EnumFormatInputRDBMS } from "@constants/enum";
import FileType from "./FileType";
import RDBMS from "./RDBMS";

const DetailOutput = () => {
  const methods = useFormContext<IDatasets>();

  const [dataStorageWatch, isOutputVisible] = useWatch({
    control: methods.control,
    name: ["output.dataStorage", "output.isOutputVisible"],
  });

  const OPTIONS_DATASOURCE = useMemo(() => {
    return {
      [EnumDataSource.FILE]: <FileType />,
      [EnumDataSource.HIVE]: <FileType />,
      [EnumDataSource.MYSQL]: <RDBMS />,
      [EnumDataSource.POSTGRESQL]: <RDBMS />,
      [EnumDataSource.ORACLE]: <RDBMS />,
      [EnumDataSource.MS_SQL]: <RDBMS />,
    };
  }, []);

  return (
    <Box marginTop={1}>
      <KWrapper.CardAccordion title="Output" controls="panel-content-input">
        <Box>
          <Grid container spacing={2}>
            <Fragment>
              <Grid size={{ xs: 12 }}>
                <Controller
                  name={`output.isOutputVisible`}
                  control={methods.control}
                  render={({ field }) => (
                    <FormControlLabel
                      {...field}
                      control={
                        <Checkbox
                          onChange={(e) => {
                            const isOutputVisible = e.target.checked;
                            if (isOutputVisible) {
                              methods.setValue("output", defaultOutput);
                            } else {
                              methods.setValue("output", undefined as any);
                            }
                            field.onChange(e);
                          }}
                        />
                      }
                      label="Is Output Visible"
                      checked={!!isOutputVisible}
                    />
                  )}
                />
              </Grid>
              {isOutputVisible && (
                <Fragment>
                  <Grid size={{ xs: 12 }}>
                    <Controller
                      key={`output.dataStorage`}
                      name={`output.dataStorage`}
                      control={methods.control}
                      render={({ field }) => (
                        <KInput.Select
                          {...field}
                          label="Data Storage"
                          options={generateOptions(EnumDataSource)}
                          onChange={(
                            e: React.ChangeEvent<{ value: unknown }>
                          ) => {
                            field.onChange(e);

                            const val = e?.target?.value as EnumDataSource;

                            if (OPTIONS_TYPE_DATASOURCE[val] === "RDBMS") {
                              methods.setValue(
                                "output.format",
                                EnumFormatInputRDBMS.JDBC
                              );
                            }
                          }}
                        />
                      )}
                    />
                  </Grid>

                  {OPTIONS_DATASOURCE[dataStorageWatch]}
                </Fragment>
              )}
            </Fragment>
          </Grid>
        </Box>
      </KWrapper.CardAccordion>
    </Box>
  );
};

export default memo(DetailOutput);

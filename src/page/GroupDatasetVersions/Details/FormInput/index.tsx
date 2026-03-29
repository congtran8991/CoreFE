import { Fragment, memo, useMemo } from "react";
import { Box, Checkbox, FormControlLabel, Grid } from "@mui/material";

import { Controller, useFormContext, useWatch } from "react-hook-form";

import { KInput, KWrapper } from "@uikit";
import {
  defaultInput,
  generateOptionsListDataset,
  IDatasets,
  Input,
} from "../../helpers";
import {
  generateOptions,
  OPTIONS_TYPE_DATASOURCE,
} from "@constants/option.tsx";
import { EnumDataSource, EnumFormatInputRDBMS } from "@constants/enum.tsx";
import FileType from "./FileType.tsx";
import RDBMS from "./RDBMS";

// import File from "./FileType.tsx";

const DetailInput = () => {
  const methods = useFormContext<IDatasets>();

  const [inputDatasourceWatch, isPathToDataset, listDatasets, nameDataset] =
    useWatch({
      control: methods.control,
      name: [
        "input.dataSource",
        "input.isPathToDataset",
        "listDatasets",
        "name",
      ],
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
    <Box>
      <KWrapper.CardAccordion title="Input" controls="panel-content-input">
        <Box>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Controller
                name={`input.isPathToDataset`}
                control={methods.control}
                render={({ field }) => (
                  <FormControlLabel
                    {...field}
                    control={
                      <Checkbox
                        onChange={(e) => {
                          // const _isPathToDataset = e.target.checked;
                          // if (_isPathToDataset) {
                          methods.setValue("input", defaultInput);
                          // }

                          field.onChange(e);
                        }}
                      />
                    }
                    label="Is Path To Dataset"
                    checked={!!isPathToDataset}
                  />
                )}
              />
            </Grid>

            {isPathToDataset && (
              <Grid size={{ xs: 12 }}>
                <Controller
                  key={`input.path`}
                  name={`input.path`}
                  control={methods.control}
                  render={({ field, fieldState: { error } }) => (
                    <KInput.Select
                      {...field}
                      label="Path"
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
            )}
            {!isPathToDataset && (
              <Fragment>
                <Grid size={{ xs: 12 }}>
                  <Controller
                    key={`input.dataSource`}
                    name={`input.dataSource`}
                    control={methods.control}
                    render={({ field }) => (
                      <KInput.Select
                        {...field}
                        label="Data Source"
                        options={generateOptions(EnumDataSource)}
                        onChange={(
                          e: React.ChangeEvent<{ value: unknown }>
                        ) => {
                          let _defaultInput: Input = defaultInput;
                          const val = e?.target?.value as EnumDataSource;

                          if (OPTIONS_TYPE_DATASOURCE[val] === "RDBMS") {
                            _defaultInput = {
                              ...defaultInput,
                              format: EnumFormatInputRDBMS.JDBC,
                              isPathToDataset,
                            };
                          }

                          methods.setValue("input", _defaultInput);
                          field.onChange(e);
                        }}
                      />
                    )}
                  />
                </Grid>

                {OPTIONS_DATASOURCE[inputDatasourceWatch]}
              </Fragment>
            )}
          </Grid>
        </Box>
      </KWrapper.CardAccordion>
    </Box>
  );
};

export default memo(DetailInput);

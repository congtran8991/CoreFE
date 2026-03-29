import * as yup from "yup";
// import YAML from "yaml";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useResolverForm } from "@hooks/lib/useResolverForm";
import { KInput, KForm } from "@uikit";

import { Controller, FormProvider, useWatch } from "react-hook-form";
import { memo, useCallback, useMemo } from "react";
import DetailInput from "./FormInput";
import DetailSteps from "./FormSteps";

import DetailOutput from "./FormOutput";

import ListDataset from "./Form.ListDataset";

import {
  defaultInput,
  defaultOutput,
  defaultStep,
  formatValueAddingDataset,
  IDatasets,
  StatusAction,
} from "../helpers";

import yaml from "js-yaml";
import { CopyBlock, dracula } from "react-code-blocks";

import { useDatasetGroupDetail, useDatasets } from "@hooks/groupDatasets";
import { useParams } from "react-router-dom";
import {
  EnumFormatInput,
  EnumFormatInputRDBMS,
  EnumFormatOutput,
  EnumTypeOptionsRepartition,
  EnumTypeStep,
} from "@constants/enum";

const GroupDatasetDetail = () => {
  const { groupDatasetId, datasetVersionId } = useParams();
  const { data } = useDatasets(groupDatasetId, datasetVersionId);
  const { data: groupDataSetDetail } = useDatasetGroupDetail(groupDatasetId);

  const methods = useResolverForm<IDatasets>({
    schema: yup.object().shape({
      name: yup
        .string()
        .required()
        .test("datasetName", "Duplicate Field", function (v) {
          const _listDatasets = this.parent?.listDatasets;
          const _statusAction = this.parent?.statusAction;

          if (_statusAction === StatusAction.EDIT) {
            return true;
          }

          const isDuplicateNameDataset = (_listDatasets || []).find(
            (x: any) => {
              return x?.name === v;
            }
          );

          return !isDuplicateNameDataset;
        }),
      input: yup.object().shape({
        path: yup.string().test("schema", "Required Field", function (path) {
          const format = this.parent?.format;
          if (
            format === EnumFormatInput.CSV ||
            format === EnumFormatInput.PARQUET ||
            format === EnumFormatInput.JSON
          ) {
            return !!path;
          }
          return true;
        }),
        schema: yup
          .string()
          .test("schema", "Field Invalid Format", function (schema) {
            const _isPathToDataset = this.parent.isPathToDataset;
            if (_isPathToDataset) {
              return true;
            }
            const format = this.parent?.format;
            const isSchema = this.parent?.isSchema;
            if (format === EnumFormatInput.CSV) {
              if (isSchema) {
                const isValidate = schema?.split(",").every((x) => {
                  return x.trim().split(" ").length === 2;
                });
                return !!schema && isValidate;
              } else {
                return true;
              }
            }
            return true;
          }),
        options: yup
          .mixed()
          .when("isPathToDataset", function (isPathToDataset) {
            if (!isPathToDataset[0]) {
              return yup.object().shape({
                delimiter: yup
                  .string()
                  .test("delimiter", "Required Field", function (delimiter) {
                    const { format } = this.from?.[1]?.value || {};

                    if (format === EnumFormatInput.CSV) {
                      return !!delimiter;
                    }
                    return true;
                  }),

                dbServerName: yup
                  .string()
                  .test(
                    "dbServerName",
                    "Required Field",
                    function (dbServerName) {
                      const { format } = this.from?.[1]?.value || {};

                      if (format === EnumFormatInputRDBMS.JDBC) {
                        return !!dbServerName;
                      }
                      return true;
                    }
                  ),

                user: yup
                  .string()
                  .test("user", "Required Field", function (username) {
                    const { format } = this.from?.[1]?.value || {};

                    if (format === EnumFormatInputRDBMS.JDBC) {
                      return !!username;
                    }
                    return true;
                  }),

                password: yup
                  .string()
                  .test("username", "Required Field", function (password) {
                    const { format } = this.from?.[1]?.value || {};

                    if (format === EnumFormatInputRDBMS.JDBC) {
                      return !!password;
                    }
                    return true;
                  }),

                dbName: yup
                  .string()
                  .test("dbName", "Required Field", function (dbName) {
                    const { format } = this.from?.[1]?.value || {};

                    if (format === EnumFormatInputRDBMS.JDBC) {
                      return !!dbName;
                    }
                    return true;
                  }),

                dbtable: yup
                  .string()
                  .test("dbtable", "Required Field", function (dbtable) {
                    const { format } = this.from?.[1]?.value || {};

                    if (format === EnumFormatInputRDBMS.JDBC) {
                      return !!dbtable;
                    }
                    return true;
                  }),

                partitionColumn: yup
                  .string()
                  .test(
                    "partitionColumn",
                    "Required Field",
                    function (partitionColumn) {
                      const { format } = this.from?.[1]?.value || {};

                      const _lowerBound = this.parent?.lowerBound;
                      const _upperBound = this.parent?.upperBound;
                      const _numPartitions = this.parent?.numPartitions;

                      const isValid =
                        _lowerBound || _upperBound || _numPartitions;

                      if (format === EnumFormatInputRDBMS.JDBC) {
                        if (isValid) {
                          return !!partitionColumn;
                        }
                        return true;
                      }
                      return true;
                    }
                  ),

                lowerBound: yup
                  .number()
                  .nullable()
                  .transform((value, originalValue) => {
                    // giá trị sau khi Yup parse (số hoặc NaN)
                    return originalValue === "" ? null : value;
                  })
                  .test("lowerBound", "Required Field", function (lowerBound) {
                    const { format } = this.from?.[1]?.value || {};

                    const _partitionColumn = this.parent?.partitionColumn;
                    const _upperBound = this.parent?.upperBound;
                    const _numPartitions = this.parent?.numPartitions;

                    const isValid =
                      _partitionColumn || _upperBound || _numPartitions;

                    if (format === EnumFormatInputRDBMS.JDBC) {
                      if (isValid) {
                        return !!lowerBound?.toString();
                      }
                      return true;
                    }
                    return true;
                  }),

                upperBound: yup
                  .number()
                  .nullable()
                  .transform((value, originalValue) => {
                    // giá trị sau khi Yup parse (số hoặc NaN)
                    return originalValue === "" ? null : value;
                  })
                  .test("upperBound", "Required Field", function (upperBound) {
                    const { format } = this.from?.[1]?.value || {};

                    const _partitionColumn = this.parent?.partitionColumn;
                    const _lowerBound = this.parent?.lowerBound;
                    const _numPartitions = this.parent?.numPartitions;

                    const isValid =
                      _partitionColumn || _lowerBound || _numPartitions;

                    if (format === EnumFormatInputRDBMS.JDBC) {
                      if (isValid) {
                        return !!upperBound?.toString();
                      }
                      return true;
                    }
                    return true;
                  }),

                numPartitions: yup
                  .number()
                  .nullable()
                  .transform((value, originalValue) => {
                    // giá trị sau khi Yup parse (số hoặc NaN)
                    return originalValue === "" ? null : value;
                  })
                  .test(
                    "numPartitions",
                    "Required Field",
                    function (numPartitions) {
                      const { format } = this.from?.[1]?.value || {};

                      const _partitionColumn = this.parent?.partitionColumn;
                      const _lowerBound = this.parent?.lowerBound;
                      const _upperBound = this.parent?.upperBound;

                      const isValid =
                        _partitionColumn || _lowerBound || _upperBound;

                      if (format === EnumFormatInputRDBMS.JDBC) {
                        if (isValid) {
                          return !!numPartitions?.toString();
                        }
                        return true;
                      }
                      return true;
                    }
                  ),

                fetchsize: yup
                  .number()
                  .nullable()
                  .transform((value, originalValue) => {
                    // giá trị sau khi Yup parse (số hoặc NaN)
                    return originalValue === "" ? null : value;
                  })
                  .test("fetchsize", "Required Field", function (fetchsize) {
                    const { format } = this.from?.[1]?.value || {};

                    if (format === EnumFormatInputRDBMS.JDBC) {
                      return !!fetchsize?.toString();
                    }
                    return true;
                  }),

                queryTimeout: yup
                  .number()
                  .nullable()
                  .transform((value, originalValue) => {
                    // giá trị sau khi Yup parse (số hoặc NaN)
                    return originalValue === "" ? null : value;
                  })
                  .test(
                    "queryTimeout",
                    "Required Field",
                    function (queryTimeout) {
                      const { format } = this.from?.[1]?.value || {};

                      if (format === EnumFormatInputRDBMS.JDBC) {
                        return !!queryTimeout?.toString();
                      }
                      return true;
                    }
                  ),
              });
            } else {
              return yup.mixed().notRequired();
            }
          }),
      }),
      steps: yup.array().of(
        yup.object().shape({
          col: yup
            .mixed()
            .test(
              "required_col",
              "Col must be a non-empty string or a non-empty array",
              function (col) {
                const type = this.parent?.type as string;
                const OPTIONS: Record<string, boolean> = {
                  [EnumTypeStep.transform]: true,
                  [EnumTypeStep.dropcolumns]: true,
                  [EnumTypeStep.deduplicate]: true,
                  [EnumTypeStep.join]: true,
                };

                if (OPTIONS[type]) {
                  if (typeof col === "string") {
                    return col.trim().length > 0;
                  }
                  if (Array.isArray(col)) {
                    return col.length > 0;
                  }
                  // Nếu không phải string hoặc array → fail luôn
                  return false;
                }
                return true;
              }
            ),

          expression: yup
            .mixed()
            .test(
              "required_expression",
              "Required Field",
              function (expression) {
                const type = this.parent?.type as string;
                const OPTIONS: Record<string, boolean> = {
                  [EnumTypeStep.select]: true,
                  [EnumTypeStep.filter]: true,
                  [EnumTypeStep.transform]: true,
                };

                if (!!OPTIONS[type]) {
                  if (typeof expression === "string") {
                    return expression.trim().length > 0;
                  }

                  if (Array.isArray(expression)) {
                    return expression.length > 0;
                  }
                  return false;
                }
                return true;
              }
            ),

          group_by: yup
            .mixed()
            .test(
              "required_group_by",
              "Group_by must be a non-empty string or a non-empty array",
              function (group_by) {
                const type = this.parent?.type as string;
                const OPTIONS: Record<string, boolean> = {
                  [EnumTypeStep.aggregate]: true,
                };

                if (OPTIONS[type]) {
                  if (typeof group_by === "string") {
                    return group_by.trim().length > 0;
                  }
                  if (Array.isArray(group_by)) {
                    return group_by.length > 0;
                  }
                  // Nếu không phải string hoặc array → fail luôn
                  return false;
                }
                return true;
              }
            ),

          agg_functions: yup
            .mixed()
            .test(
              "required_agg_functions",
              "Required Field",
              function (agg_functions) {
                const type = this.parent?.type as string;
                const OPTIONS: Record<string, boolean> = {
                  [EnumTypeStep.aggregate]: true,
                };

                if (!!OPTIONS[type]) {
                  if (typeof agg_functions === "string") {
                    return agg_functions.trim().length > 0;
                  }

                  if (Array.isArray(agg_functions)) {
                    return agg_functions.length > 0;
                  }
                  return false;
                }
                return true;
              }
            ),

          options: yup.object().shape({
            with_dataset: yup
              .string()
              .test("with_dataset", "Required Field", function (with_dataset) {
                const OPTIONS: Record<string, boolean> = {
                  [EnumTypeStep.union]: true,
                  [EnumTypeStep.except]: true,
                  [EnumTypeStep.join]: true,
                };

                const { type } = this.from?.[1]?.value || {};

                if (OPTIONS[type]) {
                  return !!with_dataset;
                }
                return true;
              }),

            partition_num: yup
              .number()
              .nullable()
              .transform((value, originalValue) => {
                // giá trị sau khi Yup parse (số hoặc NaN)
                return originalValue === "" ? null : value;
              })
              .test(
                "partition_num",
                "Required Field",
                function (partition_num) {
                  const { typeOptionRepartition, type } =
                    this.from?.[1]?.value || {};
                  if (type === EnumTypeStep.repartition) {
                    if (
                      typeOptionRepartition ===
                      EnumTypeOptionsRepartition.BY_NUMBER
                    ) {
                      return !!partition_num;
                    }
                    return true;
                  }
                  return true;
                }
              ),
            partition_cols: yup
              .string()
              .test(
                "partition_cols",
                "Required Field",
                function (partition_cols) {
                  const { typeOptionRepartition, type } =
                    this.from?.[1]?.value || {};
                  if (type === EnumTypeStep.repartition) {
                    if (
                      typeOptionRepartition ===
                      EnumTypeOptionsRepartition.BY_COLUMNS
                    ) {
                      if (!partition_cols) {
                        return false;
                      }

                      if (typeof partition_cols !== "string") return false;

                      // 1. Không được kết thúc bằng dấu phẩy (sau khi trim)
                      if (partition_cols.trim().endsWith(",")) {
                        return false;
                      }

                      // 2. Từng phần tử sau split phải có nội dung không rỗng
                      const parts = partition_cols
                        .split(",")
                        .map((p) => p.trim());

                      return parts.every((p) => p.length > 0);
                    }
                    return true;
                  }
                  return true;
                }
              ),
          }),
        })
      ),
      output: yup.object().shape({
        path: yup
          .string()
          .test("outputPath", "Required Field", function (path) {
            const _isOutputVisible = this.parent.isOutputVisible;
            if (!_isOutputVisible) {
              return true;
            }
            const format = this.parent?.format;
            if (
              format === EnumFormatOutput.CSV ||
              format === EnumFormatOutput.PARQUET
            ) {
              return !!path;
            }
            return true;
          }),
        options: yup
          .mixed()
          .when("isOutputVisible", function (isOutputVisible) {
            if (isOutputVisible[0]) {
              return yup.object().shape({
                delimiter: yup
                  .string()
                  .test(
                    "outputDelimiter",
                    "Required Field",
                    function (delimiter) {
                      const { format } = this.from?.[1]?.value || {};

                      if (format === EnumFormatInput.CSV) {
                        return !!delimiter;
                      }
                      return true;
                    }
                  ),
                dbServerName: yup
                  .string()
                  .test(
                    "outputDbServerName",
                    "Required Field",
                    function (dbServerName) {
                      const { format } = this.from?.[1]?.value || {};

                      if (format === EnumFormatInputRDBMS.JDBC) {
                        return !!dbServerName;
                      }
                      return true;
                    }
                  ),
                user: yup
                  .string()
                  .test("outputUser", "Required Field", function (username) {
                    const { format } = this.from?.[1]?.value || {};

                    if (format === EnumFormatInputRDBMS.JDBC) {
                      return !!username;
                    }
                    return true;
                  }),

                password: yup
                  .string()
                  .test("outputPass", "Required Field", function (password) {
                    const { format } = this.from?.[1]?.value || {};

                    if (format === EnumFormatInputRDBMS.JDBC) {
                      return !!password;
                    }
                    return true;
                  }),

                dbName: yup
                  .string()
                  .test("outputDbName", "Required Field", function (dbName) {
                    const { format } = this.from?.[1]?.value || {};

                    if (format === EnumFormatInputRDBMS.JDBC) {
                      return !!dbName;
                    }
                    return true;
                  }),

                dbtable: yup
                  .string()
                  .test("outputDbtable", "Required Field", function (table) {
                    const { format } = this.from?.[1]?.value || {};

                    if (format === EnumFormatInputRDBMS.JDBC) {
                      return !!table;
                    }
                    return true;
                  }),
                queryTimeout: yup
                  .number()
                  .nullable()
                  .transform((value, originalValue) => {
                    // giá trị sau khi Yup parse (số hoặc NaN)
                    return originalValue === "" ? null : value;
                  })
                  .test(
                    "queryTimeout",
                    "Required Field",
                    function (queryTimeout) {
                      const { format } = this.from?.[1]?.value || {};

                      if (format === EnumFormatInputRDBMS.JDBC) {
                        return !!queryTimeout?.toString();
                      }
                      return true;
                    }
                  ),
                batchsize: yup
                  .number()
                  .nullable()
                  .transform((value, originalValue) => {
                    // giá trị sau khi Yup parse (số hoặc NaN)
                    return originalValue === "" ? null : value;
                  })
                  .test(
                    "outputBatchsize",
                    "Required Field",
                    function (queryTimeout) {
                      const { format } = this.from?.[1]?.value || {};

                      if (format === EnumFormatInputRDBMS.JDBC) {
                        return !!queryTimeout?.toString();
                      }
                      return true;
                    }
                  ),
                numPartitions: yup
                  .number()
                  .nullable()
                  .transform((value, originalValue) => {
                    // giá trị sau khi Yup parse (số hoặc NaN)
                    return originalValue === "" ? null : value;
                  })
                  .test(
                    "outputNumPartitions",
                    "Required Field",
                    function (numPartitions) {
                      const { format } = this.from?.[1]?.value || {};

                      if (format === EnumFormatInputRDBMS.JDBC) {
                        return !!numPartitions?.toString();
                      }
                      return true;
                    }
                  ),
              });
            } else {
              return yup.mixed().notRequired();
            }
          }),
      }),
    }),

    configs: {
      values: {
        statusAction: StatusAction.ADD,
        listDatasets: data,
        oldName: "",
        name: "",
        input: defaultInput,
        steps: [defaultStep],
        output: defaultOutput,
        titleListDataset: `${groupDataSetDetail?.name}_${datasetVersionId ?? "new"}`,
      },
    },
  });

  const [listDatasetsWatch] = useWatch({
    control: methods.control,
    name: ["listDatasets"],
  });

  const handleSubmit = useCallback(
    (_data: IDatasets) => {
      const { listDatasets, statusAction, oldName, ...rest } = _data;

      const newData = formatValueAddingDataset(rest, false);

      if (statusAction === StatusAction.EDIT) {
        const newListData = listDatasets.map((_item) => {
          if (_item.name === oldName) {
            return newData;
          }
          return {
            ..._item,
            output: _item?.output?.isOutputVisible ? _item?.output : undefined,
          };
        });

        methods.setValue("listDatasets", newListData);
      } else {
        methods.setValue("listDatasets", [...listDatasets, newData]);
      }

      methods.setValue("statusAction", StatusAction.ADD);
      methods.setValue("oldName", "");
      methods.setValue("name", "");
      methods.setValue("input", JSON.parse(JSON.stringify(defaultInput)));
      methods.setValue("steps", [defaultStep]);
      methods.setValue("output", JSON.parse(JSON.stringify(defaultOutput)));
    },
    [methods]
  );

  const showCopyBlock = useMemo(() => {
    const res = Object.fromEntries(
      listDatasetsWatch.map((_item: Omit<IDatasets, "listDatasets">) => {
        const { input, steps, output } = formatValueAddingDataset(_item, true);
        return [`${_item.name}`, { input, steps, output }];
      })
    );

    // Dump lại với tùy chọn ép quote chuỗi
    const newYamlStr: string = yaml.dump(res, {
      quotingType: '"',
      forceQuotes: true,
      lineWidth: 2000,
      sortKeys: false,
    });

    return newYamlStr;
  }, [listDatasetsWatch]);

  const [statusActionWatch] = useWatch({
    control: methods.control,
    name: ["statusAction"],
  });

  return (
    <Box sx={{ padding: 1 }}>
      <FormProvider {...methods}>
        <KForm onSubmit={methods.handleSubmit(handleSubmit)}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 8 }}>
              <ListDataset />
              <Box marginTop={"2rem"} marginBottom={"1rem"}>
                <Typography fontWeight={"bold"} color="#ff79c6">
                  {statusActionWatch === StatusAction.EDIT
                    ? "Edit Pipeline"
                    : "Add Pipeline"}
                </Typography>
              </Box>
              <Grid size={{ xs: 12 }} rowSpacing={2}>
                <Controller
                  name={`name`}
                  control={methods.control}
                  render={({ field, fieldState: { error } }) => (
                    <KInput.Base
                      {...field}
                      size="small"
                      label="Pipeline Name"
                      message={error?.message}
                      required
                      inputLabel={{ shrink: true }}
                    />
                  )}
                />
              </Grid>
              <DetailInput />
              <DetailSteps />
              <DetailOutput />

              <Box
                display={"flex"}
                justifyContent={"end"}
                marginTop={1}
                letterSpacing={1}
              >
                <Button type="submit" variant="contained">
                  Add Pipeline
                </Button>
              </Box>
            </Grid>

            <Grid size={{ xs: 4 }}>
              <CopyBlock
                customStyle={{ height: "100%" }}
                language="yaml"
                text={showCopyBlock}
                codeBlock={true}
                theme={dracula}
                copied={true}
                showLineNumbers={false}
              />
            </Grid>
          </Grid>
        </KForm>
      </FormProvider>
    </Box>
  );
};

export default memo(GroupDatasetDetail);

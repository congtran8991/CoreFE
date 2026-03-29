import {
  formatNormalizeEmptyArr,
  formatNormalizeEmptyObj,
} from "../../../utils";
import {
  EnumModeInput,
  EnumDataSource,
  EnumFormatInput,
  EnumTypeStep,
  EnumTypeOptionsRepartition,
  EnumTypeOptionsDuplicate,
  EnumWriteModeOutput,
  EnumFormatInputRDBMS,
  EnumFormatOutput,
  EnumJoinType,
} from "../../../constants/enum";
import { useNormalizeInput } from "./normalizeInput";
import { useNormalizeSteps } from "./normalizeSteps";
import { useNormalizeOutput } from "./normalizeOutput";

export interface Input {
  dataSource: EnumDataSource;
  isPathToDataset: boolean;
  path: string;
  format: EnumFormatInput | EnumFormatInputRDBMS;
  isSchema: boolean;
  isHeaderInFileCSV: boolean;
  schema: string;
  options: {
    header: boolean;
    delimiter: string;
    mergeSchema: boolean;
    parquetBinaryAsString: boolean;
    datetimeRebaseMode: boolean;
    mode: EnumModeInput;
    multiLine: boolean;
    encoding: string;
    dbtable: string;
    dbServerName: string;
    port: 3306 | 5432 | 1521 | 1433;
    dbName: string;
    user: string;
    password: string;
    isAdvance: boolean;
    partitionColumn: string;
    lowerBound: number | null;
    upperBound: number | null;
    numPartitions: number | null;
    fetchsize: number | null;
    queryTimeout: number | null;
  };
}

export interface Output {
  dataStorage: EnumDataSource;
  path: string;
  format: EnumFormatOutput | EnumFormatInputRDBMS;
  write_mode: EnumWriteModeOutput;
  partition_by: string[];
  isOutputVisible: boolean;
  options: {
    header: boolean;
    delimiter: string;
    mergeSchema: boolean;
    parquetBinaryAsString: boolean;
    datetimeRebaseMode: boolean;
    mode: EnumModeInput;
    dbtable: string;
    dbServerName: string;
    port: 3306 | 5432 | 1521 | 1433;
    dbName: string;
    user: string;
    password: string;
    isAdvance: boolean;
    queryTimeout: number | null;
    batchsize: number | null;
    truncate: boolean;
    numPartitions: number | null;
  };
}

export interface RecordStep {
  type: EnumTypeStep;
  expression: string[];
  col: string[];
  group_by: string[];
  agg_functions: string[];
  typeOptionRepartition: EnumTypeOptionsRepartition;
  typeOptionDuplicate: EnumTypeOptionsDuplicate;
  options?: {
    partition_cols: string;
    partition_num: number | null;
    with_dataset: string;
    join_type: EnumJoinType;
  };
}

export enum StatusAction {
  ADD = "ADD",
  EDIT = "EDIT",
  DUPLICATE = "DUPLICATE",
}

export interface IDatasets {
  statusAction: StatusAction;
  listDatasets: any[];
  oldName: string;
  name: string;
  input: Input;
  steps: RecordStep[];
  output: Output;
  titleListDataset: string;
}

export const defaultStep: RecordStep = {
  type: EnumTypeStep.select,
  expression: [],
  col: [],
  group_by: [],
  agg_functions: [],
  typeOptionDuplicate: EnumTypeOptionsDuplicate.ENTIRE_ROW,
  typeOptionRepartition: EnumTypeOptionsRepartition.BY_NUMBER,
  options: {
    partition_num: null,
    partition_cols: "",
    with_dataset: "",
    join_type: EnumJoinType.INNER,
  },
};

export const defaultInput: Input = {
  dataSource: EnumDataSource.FILE,
  isPathToDataset: true,
  path: "",
  format: EnumFormatInput.CSV,
  isSchema: false,
  isHeaderInFileCSV: true,
  schema: "",
  options: {
    header: true,
    delimiter: ",",
    mergeSchema: false,
    parquetBinaryAsString: false,
    datetimeRebaseMode: false,
    mode: EnumModeInput.CORRECTED,
    multiLine: true,
    encoding: "",
    dbtable: "",
    dbServerName: "",
    port: 3306,
    dbName: "",
    user: "",
    password: "",
    isAdvance: true,
    partitionColumn: "",
    lowerBound: null,
    upperBound: null,
    numPartitions: null,
    fetchsize: null,
    queryTimeout: null,
  },
};

export const defaultOutput: Output = {
  dataStorage: EnumDataSource.FILE,
  path: "",
  format: EnumFormatOutput.CSV,
  write_mode: EnumWriteModeOutput.OVERWRITE,
  partition_by: [],
  isOutputVisible: false,
  options: {
    header: true,
    delimiter: ",",
    mergeSchema: false,
    parquetBinaryAsString: false,
    datetimeRebaseMode: false,
    mode: EnumModeInput.CORRECTED,
    dbtable: "",
    dbServerName: "",
    port: 3306,
    dbName: "",
    user: "",
    password: "",
    isAdvance: true,
    queryTimeout: null,
    batchsize: null,
    truncate: true,
    numPartitions: null,
  },
};

// export const ListItemChipInput = ({
//   data = [],
//   onDelete,
// }: {
//   data: any[];
//   // eslint-disable-next-line no-unused-vars
//   onDelete: (str: string) => void;
// }) => {
//   return (
//     <Box display={"flex"} flexWrap={"wrap"} width={"max-content"}>
//       {(data || [])?.map((x: string, i) => (
//         <Box margin={0.5} key={i}>
//           <Chip
//             label={x}
//             size="small"
//             onDelete={() => {
//               onDelete(x);
//             }}
//           />
//         </Box>
//       ))}
//     </Box>
//   );
// };

export const formatOutput = (output: Output) => {
  const _newOutput = output
    ? {
        path: output.path || undefined,
        format: output.format || undefined,
        write_mode: output.write_mode || undefined,
        partition_by: formatNormalizeEmptyArr(output.partition_by),
        options: formatNormalizeEmptyObj(output.options),
      }
    : undefined;

  return formatNormalizeEmptyObj(_newOutput);
};

export const formatSteps = (
  steps: RecordStep[],
  isCopyBlock: boolean = false
) => {
  const _newSteps = (steps || [])
    ?.map((x) => {
      const _v = formatNormalizeEmptyObj({
        expression: formatNormalizeEmptyArr(x.expression),
        col: formatNormalizeEmptyArr(x.col),
        group_by: formatNormalizeEmptyArr(x.group_by),
        agg_functions: formatNormalizeEmptyArr(x.agg_functions),
        options: formatNormalizeEmptyObj(x.options),
      });
      if (isCopyBlock) {
        return {
          [x.type]: _v,
        };
      } else {
        return _v
          ? {
              type: x?.type,
              ..._v,
            }
          : undefined;
      }
    })
    .filter((y) => !!y);

  return formatNormalizeEmptyArr(_newSteps);
};

export const formatValueResponseDataset = (item: {
  input: Input;
  output: Output;
  steps: RecordStep[];
}) => {
  const { input, output, steps } = item || {};

  return {
    input: formatNormalizeEmptyObj(input) as Input,
    steps: formatNormalizeEmptyArr(steps) as RecordStep[],
    output: formatNormalizeEmptyObj(output) as Output,
  };
};

// export const useShowFieldInputDataset = (inputField: Input) => {
//   const { dataSource, format, isHeaderInFileCSV } = inputField;
//   return useMemo(() => {
//     const show = {
//       isShowDataSource: true,
//       isShowFormat: true,
//       isShowSchema: false,
//       isShowPath: true,
//       isShowOptionHeader: true,
//       isShowOptionDelimiter: true,
//       isShowOptionInferSchema: false,
//       isShowOptionMultiline: false,
//       isShowOptionEncoding: false,
//       isShowOptionTable: false,
//     };
//     if (dataSource === EnumDataSource.FILE) {
//       if (format === EnumFormatInput.CSV) {
//         if (isHeaderInFileCSV) {
//           show.isShowOptionHeader = true;
//           show.isShowOptionDelimiter = true;
//         } else {
//           show.isShowSchema = true;
//         }
//       }
//     }
//     return show;
//   }, [dataSource, format, isHeaderInFileCSV]);
// };

// export const useDisabledFieldInputDataset = (inputField: Input) => {
//   const { dataSource, format, isSchema, isHeaderInFileCSV } = inputField;
//   const disabledField = {
//     isDisabledDataSource: false,
//     isDisabledFormat: false,
//     isDisabledSchema: false,
//     isDisabledPath: false,
//     isDisabledOptionHeader: false,
//     isDisabledOptionDelimiter: false,
//     isDisabledOptionInferSchema: false,
//     isDisabledOptionMultiline: false,
//     isDisabledOptionEncoding: false,
//     isDisabledOptionTable: false,
//   };

//   if (isHeaderInFileCSV) {
//     disabledField.isDisabledOptionHeader = true;
//   } else {
//     disabledField.isDisabledOptionHeader = isSchema;
//   }

//   return disabledField;
// };

export const generateOptionsListDataset = (
  list: any[],
  nameDataset: string
) => {
  return list
    .filter((x) => x.name !== nameDataset)
    .map((o) => ({
      label: o?.name ?? "",
      value: o?.name ?? "",
    }));
};
//////////////////////////////////////////////////////////////////////////////

export const formatValueAddingDataset = (
  _data: Pick<IDatasets, "input" | "output" | "steps" | "name">,
  isCopyBlock: boolean = false
) => {
  const { input, output, steps = [], name } = _data;

  const _newInput = useNormalizeInput(input, isCopyBlock);

  const _newOutput = output?.isOutputVisible
    ? useNormalizeOutput(output, isCopyBlock)
    : undefined;

  const _newSteps = useNormalizeSteps(steps, isCopyBlock);

  return {
    name,
    input: _newInput,
    steps: _newSteps,
    output: _newOutput,
  };
};

import { Input } from ".";
import { EnumDataSource, EnumFormatInput } from "@constants/enum";
import { undefineValue } from "../../../utils";

export const convertDataInputDataSourceFileFormatCSV = (
  input: Input,
  isCopyBlock: boolean
) => {
  const objShowYaml = isCopyBlock
    ? undefined
    : { isHeaderInFileCSV: input.isHeaderInFileCSV, isSchema: input.isSchema };

  const val = {
    dataSource: input.dataSource,
    format: input.format,
    path: input.path || undefined,
    ...objShowYaml,
    schema: input.isSchema ? input.schema : undefined,
    options: {
      header: input.options.header,
      delimiter: undefineValue(input.options.delimiter),
    },
  };

  return val;
};

export const convertDataInputDataSourceFileFormatJSON = (
  input: Input,
  isCopyBlock: boolean
) => {
  const val = {
    isPathToDataset: isCopyBlock ? undefined : input.isPathToDataset,
    dataSource: input.dataSource,
    format: input.format,
    path: input.path,
    options: {
      multiline: input.options.multiLine,
      encoding: input.options.encoding,
    },
  };

  return val;
};

export const convertDataInputDataSourceFileFormatPARQUET = (
  input: Input,
  isCopyBlock: boolean
) => {
  const val = {
    isPathToDataset: isCopyBlock ? undefined : input.isPathToDataset,
    dataSource: input.dataSource,
    format: input.format,
    options: {
      mergeSchema: input.options.mergeSchema,
      parquetBinaryAsString: input.options.parquetBinaryAsString,
      datetimeRebaseMode: input.options.datetimeRebaseMode,
      mode: input.options.datetimeRebaseMode ? input.options.mode : undefined,
    },
  };

  return val;
};

export const convertDataInputDataSourceRDBMSFormatJDBC = (
  input: Input,
  isCopyBlock: boolean
) => {
  const isAdvance = input.options.isAdvance;

  const OPTIONS_URL: Record<
    Exclude<EnumDataSource, EnumDataSource.FILE | EnumDataSource.HIVE>,
    string
  > = {
    [EnumDataSource.MYSQL]: `jdbc:mysql://${input.options.dbServerName}:${input.options.port}/${input.options.dbName}`,
    [EnumDataSource.POSTGRESQL]: `jdbc:mysql://${input.options.dbServerName}:${input.options.port}/${input.options.dbName}`,
    [EnumDataSource.ORACLE]: `jdbc:oracle:thin:@//${input.options.dbServerName}:${input.options.port}/${input.options.dbName}`,
    [EnumDataSource.MS_SQL]: `jdbc:sqlserver://${input.options.dbServerName}:${input.options.port}:databaseName=${input.options.dbName}`,
  };

  const OPTIONS_DRIVER: Record<
    Exclude<EnumDataSource, EnumDataSource.FILE | EnumDataSource.HIVE>,
    string
  > = {
    [EnumDataSource.MYSQL]: "com.mysql.cj.jdbc.Driver",
    [EnumDataSource.POSTGRESQL]: "org.postgresql.Driver",
    [EnumDataSource.ORACLE]: "oracle.jdbc.OracleDriver",
    [EnumDataSource.MS_SQL]: "COM.micrisoft.sqlserver.jdbc.SQLServerDriver",
  };

  const val = {
    isPathToDataset: isCopyBlock ? undefined : input.isPathToDataset,
    dataSource: input.dataSource,
    format: input.format,
    options: {
      dbServerName: undefineValue(input.options.dbServerName, isCopyBlock),
      port: undefineValue(input.options.port, isCopyBlock),
      dbtable: input.options.dbtable,
      user: input.options.user,
      password: input.options.password,
      driver: OPTIONS_DRIVER[input.dataSource as keyof typeof OPTIONS_DRIVER],
      url: OPTIONS_URL[input.dataSource as keyof typeof OPTIONS_URL],
      dbName: undefineValue(input.options.dbName, isCopyBlock),
      isAdvance: isCopyBlock ? undefined : isAdvance,
      partitionColumn: isAdvance
        ? input.options.partitionColumn || undefined
        : undefined,
      lowerBound: isAdvance
        ? (input.options.lowerBound ?? undefined)
        : undefined,
      upperBound: isAdvance
        ? (input.options.upperBound ?? undefined)
        : undefined,
      numPartitions: isAdvance
        ? (input.options.numPartitions ?? undefined)
        : undefined,
      fetchsize: isAdvance ? (input.options.fetchsize ?? undefined) : undefined,
      queryTimeout: isAdvance
        ? (input.options.queryTimeout ?? undefined)
        : undefined,
    },
  };

  return val;
};

export const useNormalizeInput = (input: Input, isCopyBlock: boolean) => {
  if (input?.isPathToDataset) {
    return {
      isPathToDataset: isCopyBlock ? undefined : input.isPathToDataset,
      path: input.path,
    };
  }
  const OPTIONS = {
    [EnumDataSource.FILE]: "FILE",
    [EnumDataSource.HIVE]: "HIVE",
    [EnumDataSource.MYSQL]: "RDBMS",
    [EnumDataSource.POSTGRESQL]: "RDBMS",
    [EnumDataSource.ORACLE]: "RDBMS",
    [EnumDataSource.MS_SQL]: "RDBMS",
  };
  if (OPTIONS[input.dataSource] === "FILE") {
    const OPTIONS = {
      [EnumFormatInput.CSV]: convertDataInputDataSourceFileFormatCSV(
        input,
        isCopyBlock
      ),
      [EnumFormatInput.JSON]: convertDataInputDataSourceFileFormatJSON(
        input,
        isCopyBlock
      ),
      [EnumFormatInput.PARQUET]: convertDataInputDataSourceFileFormatPARQUET(
        input,
        isCopyBlock
      ),
    };

    return OPTIONS[input.format as EnumFormatInput];
  }
  if (OPTIONS[input.dataSource] === "RDBMS") {
    return convertDataInputDataSourceRDBMSFormatJDBC(input, isCopyBlock);
  }
  return {};
};

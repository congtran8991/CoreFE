import { undefineValue } from "@utils/index";
import { Output } from ".";
import { EnumDataSource, EnumFormatOutput } from "@constants/enum";

export const convertDataOutputDataSourceFileFormatCSV = (
  output: Output,
  isCopyBlock: boolean
) => {
  const val = {
    isOutputVisible: isCopyBlock ? undefined : output.isOutputVisible,
    dataStorage: undefineValue(output.dataStorage, isCopyBlock),
    format: output.format,
    path: output.path,
    write_mode: output.write_mode,
    options: {
      header: output.options.header,
      delimiter: output.options.delimiter,
    },
  };

  return val;
};

export const convertDataOutDataSourceFileFormatPARQUET = (
  output: Output,
  isCopyBlock: boolean
) => {
  const val = {
    isOutputVisible: isCopyBlock ? undefined : output.isOutputVisible,
    dataStorage: undefineValue(output.dataStorage, isCopyBlock),
    format: output.format,
    path: output.path,
    write_mode: output.write_mode,
    partition_by: output.partition_by,
    options: {
      mergeSchema: output.options.mergeSchema,
      parquetBinaryAsString: output.options.parquetBinaryAsString,
      datetimeRebaseMode: output.options.datetimeRebaseMode,
      mode: output.options.datetimeRebaseMode ? output.options.mode : undefined,
    },
  };

  return val;
};

export const convertDataInputDataSourceRDBMSFormatJDBC = (
  output: Output,
  isCopyBlock: boolean
) => {
  const isAdvance = output.options.isAdvance;

  const OPTIONS_URL: Record<
    Exclude<EnumDataSource, EnumDataSource.FILE | EnumDataSource.HIVE>,
    string
  > = {
    [EnumDataSource.MYSQL]: `jdbc:mysql://${output.options.dbServerName}:${output.options.port}/${output.options.dbName}`,
    [EnumDataSource.POSTGRESQL]: `jdbc:mysql://${output.options.dbServerName}:${output.options.port}/${output.options.dbName}`,
    [EnumDataSource.ORACLE]: `jdbc:oracle:thin:@//${output.options.dbServerName}:${output.options.port}/${output.options.dbName}`,
    [EnumDataSource.MS_SQL]: `jdbc:sqlserver://${output.options.dbServerName}:${output.options.port}:databaseName=${output.options.dbName}`,
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
    isOutputVisible: isCopyBlock ? undefined : output.isOutputVisible,
    dataStorage: undefineValue(output.dataStorage, isCopyBlock),
    format: output.format,
    options: {
      dbServerName: undefineValue(output.options.dbServerName, isCopyBlock),
      port: undefineValue(output.options.port, isCopyBlock),
      dbtable: output.options.dbtable,
      user: output.options.user,
      password: output.options.password,
      driver: OPTIONS_DRIVER[output.dataStorage as keyof typeof OPTIONS_DRIVER],
      url: OPTIONS_URL[output.dataStorage as keyof typeof OPTIONS_URL],
      dbName: undefineValue(output.options.dbName, isCopyBlock),
      isAdvance: undefineValue(output.options.isAdvance, isCopyBlock),

      queryTimeout: undefineValue(
        output.options.queryTimeout ?? undefined,
        !isAdvance
      ),

      batchsize: undefineValue(
        output.options.batchsize ?? undefined,
        !isAdvance
      ),
      truncate: undefineValue(output.options.truncate, !isAdvance),
      numPartitions: undefineValue(
        output.options.numPartitions ?? undefined,
        !isAdvance
      ),
    },
  };

  return val;
};

export const useNormalizeOutput = (output: Output, isCopyBlock: boolean) => {
  if (!output.isOutputVisible) {
    return {
      isOutputVisible: isCopyBlock ? undefined : output.isOutputVisible,
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
  if (OPTIONS[output?.dataStorage] === "FILE") {
    const OPTIONS = {
      [EnumFormatOutput.CSV]: convertDataOutputDataSourceFileFormatCSV(
        output,
        isCopyBlock
      ),

      [EnumFormatOutput.PARQUET]: convertDataOutDataSourceFileFormatPARQUET(
        output,
        isCopyBlock
      ),
    };

    return OPTIONS[output.format as EnumFormatOutput];
  }
  if (OPTIONS[output?.dataStorage] === "RDBMS") {
    return convertDataInputDataSourceRDBMSFormatJDBC(output, isCopyBlock);
  }
  return {};
};

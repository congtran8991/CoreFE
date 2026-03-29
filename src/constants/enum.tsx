export enum EnumDataSource {
  FILE = "FILE",
  MYSQL = "MYSQL",
  POSTGRESQL = "POSTGRESQL",
  ORACLE = "ORACLE",
  MS_SQL = "MS_SQL",
  HIVE = "HIVE",
}

export enum EnumFormatInput {
  CSV = "CSV",
  JSON = "JSON",
  PARQUET = "PARQUET",
}

export enum EnumFormatOutput {
  CSV = "CSV",
  PARQUET = "PARQUET",
}

export enum EnumFormatInputRDBMS {
  JDBC = "JDBC",
}

export enum EnumTypeStep {
  select = "select",
  filter = "filter",
  transform = "transform",
  aggregate = "aggregate",
  deduplicate = "deduplicate",
  dropcolumns = "dropcolumns",
  except = "except",
  join = "join",
  union = "union",
  repartition = "repartition",
}

export enum EnumBoolean {
  TRUE = "true",
  FALSE = "false",
}

export enum EnumModeInput {
  LEGACY = "LEGACY",
  CORRECTED = "CORRECTED",
  EXCEPTION = "EXCEPTION",
}

export enum EnumTypeOptionsRepartition {
  BY_NUMBER = "BY_NUMBER",
  BY_COLUMNS = "BY_COLUMNS",
}

export enum EnumTypeOptionsDuplicate {
  ENTIRE_ROW = "BY_NUMBER",
  SELECTED_COLUMNS = "SELECTED_COLUMNS",
}

export enum EnumJoinType {
  INNER = "INNER",
  CROSS = "CROSS",
  OUTER = "OUTER",
  FULL = "FULL",
  FULLOUTER = "FULLOUTER",
  FULL_OUTER = "FULL_OUTER",
  LEFT = "LEFT",
  LEFTOUTER = "LEFTOUTER",
  LEFT_OUTER = "LEFT_OUTER",
  RIGHT = "RIGHT",
  RIGHTOUTER = "RIGHTOUTER",
  RIGHT_OUTER = "RIGHT_OUTER",
  SEMI = "SEMI",
  LEFTSEMI = "LEFTSEMI",
  LEFT_SEMI = "LEFT_SEMI",
  ANTI = "ANTI",
  LEFTANTI = "LEFTANTI",
  LEFT_ANTI = "LEFT_ANTI",
}

export enum EnumWriteModeOutput {
  APPEND = "APPEND",
  OVERWRITE = "OVERWRITE",
}

import { EnumDataSource } from "./enum";

export const generateOptions = <
  T extends string,
  TValue extends string | number,
>(e: {
  [key in T]: TValue;
}) => {
  return (Object.keys(e) as T[]).map((i) => {
    const v = e[i] === 1 ? true : e[i] === 0 ? false : e[i];
    return {
      value: v,
      label: i.toUpperCase(),
    };
  });
};

export const OPTIONS_TYPE_DATASOURCE = {
  [EnumDataSource.FILE]: "FILE",
  [EnumDataSource.HIVE]: "HIVE",
  [EnumDataSource.MYSQL]: "RDBMS",
  [EnumDataSource.POSTGRESQL]: "RDBMS",
  [EnumDataSource.ORACLE]: "RDBMS",
  [EnumDataSource.MS_SQL]: "RDBMS",
};

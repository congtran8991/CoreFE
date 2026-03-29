export const removeSpace = (str: string) => {
  return str.replace(/\s*"\s*([^"]*?)\s*"\s*/g, '"$1"');
};

export const isValidJSON = (str: string): boolean => {
  try {
    const parsed = JSON.parse(str);
    return typeof parsed === "object" && parsed !== null;
  } catch (_error) {
    return false;
  }
};

export const formatNormalizeEmptyObj = (val?: Record<string, any>) => {
  if (!val || Object.keys(val).length === 0) {
    return undefined;
  }

  const _val = Object.fromEntries(
    Object.entries(val).filter(([_, value]) => {
      if (value === false) {
        return true;
      }
      return !!value;
    })
  );

  return Object.values(val).some((x) => !!x) ? _val : undefined;
};

export const formatNormalizeEmptyArr = (arr: any[]) => {
  return !!arr?.length ? arr : undefined;
};

export const undefineValue = (value: any, isBoolean: boolean = false) => {
  return isBoolean ? undefined : value ? value : undefined;
};

export const STORAGE_KEYS = {
  user: "s.user",
};

export class StorageEnhance {
  static readonly set = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  static readonly get = (key: string) => {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : undefined;
  };

  static readonly delete = (key: string) => {
    localStorage.removeItem(key);
  };

  static readonly clear = () => {
    localStorage.clear();
  };
}

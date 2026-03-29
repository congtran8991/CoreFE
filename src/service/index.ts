// import { STORAGE_KEYS, StorageEnhance } from "@/core/storage";
import { AxiosRequestConfig } from "axios";
import qs from "query-string";
import { apiInstance } from "../constants/instance";
import { STORAGE_KEYS, StorageEnhance } from "../hooks/lib/storage";
import { v4 as uuidv4 } from "uuid";
import { showToastAlert } from "../utils/common";

interface IParams {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  configs?: AxiosRequestConfig;
  body?: any;
  showError?: boolean;
  showToast?: boolean;
}

apiInstance.interceptors.request.use(
  (config: any) => {
    config.url = config.baseURL + config.url;
    // console.log(config.url, "config123");
    if (!config.headers.Authorization) {
      // Thêm token vào header của request
      const localUser = StorageEnhance.get(STORAGE_KEYS.user);
      if (localUser?.access_token) {
        config.headers.Authorization = `Bearer ${localUser?.access_token}`;
      }
    }

    config.headers = {
      ...config.headers,
      "X-Request-Id": uuidv4(), // Tạo một ID ngẫu nhiên
    };

    return config;
  },
  (error) => {
    // Xử lý lỗi request
    return Promise.reject(error);
  }
);
class APIManager {
  static request = async ({
    url,
    method = "GET",
    body,
    configs,
    showToast = true,
    showError = true,
  }: IParams) => {
    try {
      let res;
      if (method === "GET" || method === "DELETE") {
        res = await apiInstance({
          method: method.toLowerCase(),
          url: body ? `${url}?${qs.stringify(body)}` : url,
          ...configs,
        });
      } else {
        res = await apiInstance({
          method: method.toLowerCase(),
          url,
          data: body,
          ...configs,
        });
      }

      if (configs?.responseType === "blob") {
        return Promise.resolve({
          status: res.status,
          data: res.data,
          message: res.data.message,
        });
      }

      if (res.data?.success) {
        if (showToast) {
          showToastAlert("success", res.data.message);
        }
        return Promise.resolve({
          status: res.status,
          data: res.data?.data,
          message: res.data.message,
        });
      }
    } catch (e: any) {
      const { response } = e;

      if (showError) {
        showToastAlert("error", response?.data.message);
      }
      if (response?.status === 401) {
        return Promise.resolve({
          status: response?.status,
          data: response?.data?.data,
          message: response?.data.message,
        });
      } else {
        return Promise.resolve({
          status: response?.status,
          data: response?.data?.data,
          message: response?.data.message,
        });
      }
    }
  };
}

export default APIManager;

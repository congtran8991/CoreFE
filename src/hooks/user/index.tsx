import { useQueryEnhancer } from "../core/useRequestProcessor";
import { QUERY_KEYS } from "../../constants/query";
import APIManager from "../../service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PortalHandle from "../../utils/portal";
import { STORAGE_KEYS, StorageEnhance } from "../lib/storage";
import { showPopupLogin } from "../../component/layout/helpers";

export const useUser = () => {
  return useQueryEnhancer<any>({
    queryKey: [QUERY_KEYS.user],
    initialData: undefined,
    queryFn: async () => {
      const res = await APIManager.request({
        url: `api/user/current-user`,
        method: "GET",
        showToast: false,
      });

      return res?.data ?? null;
    },
  });
};

export const useGetListUser = () => {
  return useQueryEnhancer<any[]>({
    queryKey: [QUERY_KEYS.listUser],
    initialData: [],
    queryFn: async () => {
      const res = await APIManager.request({
        url: `api/user/get-users`,
        method: "GET",
        showToast: false,
      });

      return res?.data ?? [];
    },
  });
};

export const useMutationLoginUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (_param: { email: string; password: string }) => {
      const res = await APIManager.request({
        url: "api/user/login-user",
        method: "POST",
        body: {
          email: _param.email,
          hashed_password: _param.password,
        },
      });

      return res?.data;
    },
    onSuccess: async (data) => {
      if (data) {
        StorageEnhance.set(STORAGE_KEYS.user, data);
        await queryClient.refetchQueries({
          queryKey: [QUERY_KEYS.user],
          type: "active",
        });
        window.location.reload();
        PortalHandle.popup.dismissAll();
      }
    },
  });
  return mutation;
};

export const useMutationRegister = () => {
  const mutation = useMutation({
    mutationFn: async (_param: { email: string; password: string }) => {
      const res = await APIManager.request({
        url: "api/user/register-user",
        method: "POST",
        body: {
          email: _param.email,
          hashed_password: _param.password,
        },
      });

      return res?.data;
    },
    onSuccess: async (data) => {
      if (data) {
        PortalHandle.popup.dismiss();
        showPopupLogin();
      }
    },
  });
  return mutation;
};

export const useMutationAddUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (_param: {
      email: string;
      password: string;
      isSuperAdmin: boolean;
      isActive: boolean;
    }) => {
      const res = await APIManager.request({
        url: "api/user/create-user",
        method: "POST",
        body: {
          email: _param.email,
          hashed_password: _param.password,
          is_super_admin: _param.isSuperAdmin,
          is_active: _param.isActive,
        },
      });

      return res?.data;
    },
    onSuccess: async (data) => {
      if (data) {
        await queryClient.refetchQueries({
          queryKey: [QUERY_KEYS.listUser],
          type: "active",
        });
        PortalHandle.popup.dismiss();
      }
    },
  });
  return mutation;
};

export const useMutationUpdateUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (_param: {
      id?: string | number;
      isSuperAdmin: boolean;
      isActive: boolean;
    }) => {
      const res = await APIManager.request({
        url: "api/user/update-user",
        method: "PUT",
        body: {
          id: _param.id,
          is_super_admin: _param.isSuperAdmin,
          is_active: _param.isActive,
        },
      });

      return res?.data;
    },
    onSuccess: async (data) => {
      if (data) {
        await queryClient.refetchQueries({
          queryKey: [QUERY_KEYS.listUser],
          type: "active",
        });
        PortalHandle.popup.dismiss();
      }
    },
  });
  return mutation;
};

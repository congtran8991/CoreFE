import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../constants/query";
import APIManager from "../../service";
import { useQueryEnhancer } from "../core/useRequestProcessor";
import PortalHandle from "../../utils/portal";
import { useNavigate } from "react-router-dom";
import { formatValueResponseDataset } from "../../page/GroupDatasetVersions/helpers";
import { useFileExport } from "./helpers";

export const useDatasetGroup = () => {
  return useQueryEnhancer<any[]>({
    queryKey: [QUERY_KEYS.datasetGroup],
    initialData: [],
    queryFn: async () => {
      const res = await APIManager.request({
        url: "api/group-datasets",
        method: "GET",
        showToast: false,
      });

      return res?.data ?? [];
    },
  });
};

export const useDatasetGroupDetail = (groupDatasetId?: number | string) => {
  return useQueryEnhancer<any>({
    queryKey: [QUERY_KEYS.datasetGroupDetail, groupDatasetId],
    initialData: {},
    queryFn: async () => {
      const res = await APIManager.request({
        url: `api/group-datasets/${groupDatasetId}`,
        method: "GET",
        showToast: false,
      });

      return res?.data;
    },
    enabled: !!groupDatasetId,
  });
};

export const useDatasetVersionsByGroupDataset = (
  groupDatasetId?: number | string
) => {
  return useQueryEnhancer<any[]>({
    queryKey: [QUERY_KEYS.datasetVersionsByGroupDataset, groupDatasetId],
    initialData: [],
    queryFn: async () => {
      const res = await APIManager.request({
        url: `api/dataset-version/group-dataset/${groupDatasetId}`,
        method: "GET",
        showToast: false,
      });

      return res?.data ?? [];
    },
    enabled: !!groupDatasetId,
  });
};

export const useMutationDeleteGroupDatasetVersion = (
  groupDatasetId: number | string
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (params: { ids: number[] }) => {
      const res = await APIManager.request({
        url: `api/dataset-version/group-dataset/${groupDatasetId}`,
        method: "DELETE",
        body: {
          ...params,
        },
      });

      return res?.data;
    },
    onSuccess: async (data) => {
      if (data) {
        await queryClient.refetchQueries({
          queryKey: [QUERY_KEYS.datasetVersionsByGroupDataset, groupDatasetId],
          type: "active",
        });
        PortalHandle.popper.dismiss();
      }
    },
  });

  return mutation;
};

export const useDatasets = (
  group_dataset_id?: number | string,
  dataset_version_id?: number | string
) => {
  return useQueryEnhancer<any[]>({
    queryKey: [QUERY_KEYS.datasets, group_dataset_id, dataset_version_id],
    initialData: [],
    queryFn: async () => {
      const res = await APIManager.request({
        url: `api/datasets/group-dataset/${group_dataset_id}/dataset-version/${dataset_version_id}`,
        method: "GET",
        showToast: false,
      });

      return (res?.data ?? []).map((_item: any) => {
        const { input, output, steps } = _item || {};

        return {
          ..._item,
          ...formatValueResponseDataset({ input, output, steps }),
        };
      });
    },
    enabled: !!dataset_version_id,
  });
};

export const useGetListPermissionForGroupDataset = (
  group_dataset_id?: number
) => {
  return useQueryEnhancer<any[]>({
    queryKey: [QUERY_KEYS.listPermissionByGroupDataset],
    initialData: [],
    queryFn: async () => {
      const res = await APIManager.request({
        url: `api/permission-group-datasets/group-dataset/${group_dataset_id}`,
        method: "GET",
        showToast: false,
      });

      return res?.data;
    },
    enabled: !!group_dataset_id,
  });
};

export const useMutationCreateGroupDataset = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (_param: { code: string; name: string }) => {
      const res = await APIManager.request({
        url: "api/group-datasets",
        method: "POST",
        body: {
          code: _param.code,
          name: _param.name,
        },
      });

      return res?.data;
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.datasetGroup],
        type: "active",
      });
      PortalHandle.popup.dismissAll();
    },
  });
  return mutation;
};

export const useMutationUpdateGroupDataset = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (_param: {
      id: string | number;
      code: string;
      name: string;
    }) => {
      const res = await APIManager.request({
        url: "api/group-datasets",
        method: "PUT",
        body: {
          ..._param,
        },
      });

      return res?.data;
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.datasetGroup],
        type: "active",
      });
      PortalHandle.popup.dismissAll();
    },
  });
  return mutation;
};

export const useMutationSaveDatasets = () => {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async (_param: {
      group_dataset_id: number | string;
      list_dataset: any[];
    }) => {
      const res = await APIManager.request({
        url: "api/datasets",
        method: "POST",
        body: {
          ..._param,
        },
      });

      return res?.data ?? [];
    },
    onSuccess: async (data) => {
      if (data) {
        navigate(`../${data?.[0].version_id}`, { replace: true });
      }
    },
  });

  return mutation;
};

export const useMutationDeleteGroupDataset = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (ids: number[]) => {
      const res = await APIManager.request({
        url: "api/group-datasets",
        method: "DELETE",
        body: {
          ids,
        },
      });

      return res?.data ?? [];
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.datasetGroup],
        type: "active",
      });
      PortalHandle.popper.dismiss();
    },
  });

  return mutation;
};

export const useMutationDeletePermissionGroupDataset = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (params: {
      ids: (number | string)[];
      group_dataset_id: number | string;
    }) => {
      const res = await APIManager.request({
        url: "api/permission-group-datasets",
        method: "DELETE",
        body: {
          ...params,
        },
      });

      return res?.data ?? [];
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.listPermissionByGroupDataset],
        type: "active",
      });
    },
  });

  return mutation;
};

export const useMutationAddUpdatePermissionGroupDataset = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (params: {
      method: "POST" | "PUT";
      id?: string | number;
      groupDatasetId: string | number;
      email: string;
      canView: boolean;
      canCreate: boolean;
      canEdit: boolean;
      canDelete: boolean;
    }) => {
      const res = await APIManager.request({
        url: "api/permission-group-datasets",
        method: params.method,
        body: {
          id: params.id,
          group_dataset_id: params.groupDatasetId,
          email: params.email,
          can_view: params.canView,
          can_create: params.canCreate,
          can_edit: params.canEdit,
          can_delete: params.canDelete,
        },
      });
      return res?.data ?? null;
    },
    onSuccess: async (data) => {
      if (data) {
        await queryClient.refetchQueries({
          queryKey: [QUERY_KEYS.listPermissionByGroupDataset],
          type: "active",
        });
      }
    },
  });

  return mutation;
};

export const useMutationUpdateDatasetVersion = (
  group_dataset_id: string | number
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (_param: { id: number | string; note: string }) => {
      const res = await APIManager.request({
        url: `api/dataset-version/group-dataset/${group_dataset_id}`,
        method: "PUT",
        body: {
          ..._param,
        },
      });

      return res?.data;
    },
    onSuccess: async (data) => {
      if (data) {
        await queryClient.refetchQueries({
          queryKey: [QUERY_KEYS.datasetVersionsByGroupDataset],
          type: "active",
        });
        PortalHandle.popper.dismissAll();
      }
    },
  });
  return mutation;
};

export const useMutationExportYamlDatasetVersion = (
  group_dataset_id: string | number
) => {
  const { exportFile } = useFileExport();
  const mutation = useMutation({
    mutationFn: async (_param: { datasetVersionId: number | string }) => {
      const res = await APIManager.request({
        url: `api/dataset-version/group-dataset/${group_dataset_id}/export-yaml`,
        method: "POST",
        body: {
          dataset_version_id: _param.datasetVersionId,
        },
        configs: {
          responseType: "blob",
        },
      });

      return res?.data; // res.data chính là Blob
    },
    onSuccess: (blob: any) => {
      exportFile(blob);
    },
  });

  return mutation;
};

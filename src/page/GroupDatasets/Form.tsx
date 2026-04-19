import * as yup from "yup";
import { memo, useCallback } from "react";
import { Grid } from "@mui/material";
import { Controller } from "react-hook-form";
import { useResolverForm } from "@hooks/lib/useResolverForm";
import { KInput, KForm, KButtons } from "@uikit";
import { AbcOutlined } from "@mui/icons-material";
// import Form from "@libs/Form";
import {
  useMutationCreateGroupDataset,
  useMutationUpdateGroupDataset,
} from "@hooks/groupDatasets";

interface IFormGroupDataset {
  id: number | string;
  code: string;
  name: string;
}
const FormAddGroupDataset = ({ item }: { item: any }) => {
  const isEdit = item?.id;

  const methods = useResolverForm<IFormGroupDataset>({
    schema: yup.object().shape({
      name: yup.string().required("Required Field"),
    }),
    configs: {
      values: {
        id: item?.id ?? "",
        code: item?.code ?? "",
        name: item?.name ?? "",
      },
    },
  });

  const { mutate: createGroupDatasetMutation } =
    useMutationCreateGroupDataset();

  const { mutate: updateGroupDatasetMutation } =
    useMutationUpdateGroupDataset();

  const handleSubmit = useCallback(
    (_param: IFormGroupDataset) => {
      const { name, id } = _param;

      const _name = name.trim().split(" ").join("_") + "_pipeline";

      const newParams = {
        id,
        name: _name,
        code: _name?.toLowerCase(),
      };

      if (_param?.id) {
        updateGroupDatasetMutation(newParams);
      } else {
        createGroupDatasetMutation(newParams);
      }
    },
    [createGroupDatasetMutation, updateGroupDatasetMutation]
  );

  return (
    <KForm onSubmit={methods.handleSubmit(handleSubmit)}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 10 }}>
          <Controller
            name={`name`}
            control={methods.control}
            render={({ field, fieldState: { error } }) => (
              <KInput.Base
                {...field}
                size="small"
                label="Pipeline Name"
                message={error?.message}
                inputLabel={{ shrink: true }}
                horizontal={false}
                required
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 2 }}>
          <KButtons.Text size="md" kind="primary" loading={false} typo="Text2xLgBold" type="submit" iconStart={AbcOutlined} title={isEdit ? "Update" : "Create"} />
        </Grid>
      </Grid>
    </KForm>
  );
};

export default memo(FormAddGroupDataset);

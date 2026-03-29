import * as yup from "yup";
import { Fragment, memo, useCallback } from "react";
import { Button, Checkbox, FormControlLabel, Grid } from "@mui/material";
import { Controller, useFieldArray, useWatch } from "react-hook-form";
import { useResolverForm } from "../../hooks/lib/useResolverForm";
// import KInput from "@libs/Input";
// import Form from "@libs/Form";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import {
  useGetListPermissionForGroupDataset,
  useMutationAddUpdatePermissionGroupDataset,
  useMutationDeletePermissionGroupDataset,
} from "@hooks/groupDatasets";
import { KForm, KInput } from "@uikit";

interface RecordListAccount {
  id: string | number;
  groupDatasetId: string | number;
  email: string;
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
}
interface IFormGroupDataset {
  listAccount: RecordListAccount[];
}

const FormPermission = ({ item }: any) => {
  const { data } = useGetListPermissionForGroupDataset(item?.id);

  const { mutate: deleteMutation } = useMutationDeletePermissionGroupDataset();
  const { mutate: addUpdateMutation } =
    useMutationAddUpdatePermissionGroupDataset();

  const isEdit = item?.id;

  const defaultValue = {
    id: "",
    groupDatasetId: item?.id,
    email: "",
    canView: true,
    canCreate: true,
    canEdit: true,
    canDelete: true,
  };
  const methods = useResolverForm<IFormGroupDataset>({
    schema: yup.object().shape({
      listAccount: yup.array().of(
        yup.object().shape({
          email: yup.string().email().required(),
          canView: yup.boolean(),
          canAdd: yup.boolean(),
          canEdit: yup.boolean(),
          canDelete: yup.boolean(),
        })
      ),
    }),
    configs: {
      values: {
        listAccount: data.map((_item) => {
          return {
            id: _item?.id,
            groupDatasetId: _item?.group_dataset_id,
            email: _item?.granted_to_user?.email,
            canView: _item?.can_view,
            canCreate: _item?.can_create,
            canEdit: _item?.can_edit,
            canDelete: _item?.can_delete,
          };
        }) ?? [defaultValue],
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control, // control props comes from useForm (optional: if you are using FormContext)
    name: "listAccount", // unique name for your Field Array
    keyName: "formPermissionId",
  });

  const [listAccountWatch] = useWatch({
    control: methods.control,
    name: ["listAccount"],
  });

  const handleSubmit = useCallback((_param: IFormGroupDataset) => {}, []);

  const handleAdd = useCallback(
    async (index: number) => {
      const isValid = await methods.trigger(`listAccount.${index}.email`);
      if (isValid) {
        const param = listAccountWatch[index];

        addUpdateMutation({ ...param, method: "POST" });
      }
    },
    [addUpdateMutation, listAccountWatch, methods]
  );

  const handleUpdate = useCallback(
    async (index: number) => {
      const isValid = await methods.trigger(`listAccount.${index}.email`);
      if (isValid) {
        const param = listAccountWatch[index];

        addUpdateMutation({ ...param, method: "PUT" });
      }
    },
    [addUpdateMutation, listAccountWatch, methods]
  );

  const handleDelete = useCallback(
    async (index: number) => {
      const isValid = await methods.trigger(`listAccount.${index}.email`);
      if (isValid) {
        const param = listAccountWatch[index];

        deleteMutation({
          ids: [param.id],
          group_dataset_id: param.groupDatasetId,
        });
      }
    },
    [deleteMutation, listAccountWatch, methods]
  );

  return (
    <KForm onSubmit={methods.handleSubmit(handleSubmit)}>
      <div
        style={{ marginBottom: "1rem" }}
        onClick={() => {
          append(defaultValue);
        }}
      >
        <AddCircleOutlineOutlinedIcon />
      </div>
      <Grid container spacing={[2, 1]}>
        {fields.map((itm, index) => {
          return (
            <Fragment key={itm.formPermissionId}>
              <Grid size={{ xs: 4.2 }}>
                <Controller
                  key={`listAccount.${index}.email`}
                  name={`listAccount.${index}.email`}
                  control={methods.control}
                  render={({ field, fieldState: { error } }) => (
                    <KInput.Base
                      {...field}
                      size="small"
                      label="email"
                      message={error?.message}
                      inputLabel={{ shrink: true }}
                      disabled={!!itm?.id}
                      required
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 0.4 }}></Grid>

              <Grid size={{ xs: 1.2 }}>
                <Controller
                  key={`listAccount.${index}.canView`}
                  name={`listAccount.${index}.canView`}
                  control={methods.control}
                  render={({ field }) => {
                    return (
                      <FormControlLabel
                        {...field}
                        control={<Checkbox />}
                        checked={field.value}
                        label="xem"
                      />
                    );
                  }}
                />
              </Grid>

              <Grid size={{ xs: 1.2 }}>
                <Controller
                  key={`listAccount.${index}.canCreate`}
                  name={`listAccount.${index}.canCreate`}
                  control={methods.control}
                  render={({ field }) => (
                    <FormControlLabel
                      {...field}
                      control={<Checkbox />}
                      checked={field.value}
                      label="Thêm"
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 1.2 }}>
                <Controller
                  key={`listAccount.${index}.canEdit`}
                  name={`listAccount.${index}.canEdit`}
                  control={methods.control}
                  render={({ field }) => (
                    <FormControlLabel
                      {...field}
                      control={<Checkbox />}
                      checked={field.value}
                      label="Sửa"
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 1.2 }}>
                <Controller
                  key={`listAccount.${index}.canDelete`}
                  name={`listAccount.${index}.canDelete`}
                  control={methods.control}
                  render={({ field }) => (
                    <FormControlLabel
                      {...field}
                      control={<Checkbox />}
                      checked={field.value}
                      label="Xoá"
                    />
                  )}
                />
              </Grid>

              {!itm?.id && (
                <>
                  <Grid size={{ xs: 1 }} marginTop={"0.5rem"}></Grid>
                  <Grid size={{ xs: 0.6 }} marginTop={"0.5rem"}>
                    <div
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      <ClearOutlinedIcon color="error" />
                    </div>
                  </Grid>

                  <Grid size={{ xs: 1 }} marginTop={"0.25rem"}>
                    <Button
                      variant="contained"
                      size={"small"}
                      name="add"
                      onClick={() => {
                        handleAdd(index);
                      }}
                    >
                      Add
                    </Button>
                  </Grid>
                </>
              )}

              {itm?.id && (
                <>
                  <Grid size={{ xs: 1.3 }} marginTop={"0.25rem"}>
                    <Button
                      variant="contained"
                      color="warning"
                      size={"small"}
                      onClick={() => {
                        handleUpdate(index);
                      }}
                    >
                      Update
                    </Button>
                  </Grid>

                  <Grid size={{ xs: 1.3 }} marginTop={"0.25rem"}>
                    <Button
                      variant="contained"
                      color="error"
                      size={"small"}
                      onClick={() => {
                        handleDelete(index);
                      }}
                    >
                      Delete
                    </Button>
                  </Grid>
                </>
              )}
            </Fragment>
          );
        })}
      </Grid>
    </KForm>
  );
};

export default memo(FormPermission);

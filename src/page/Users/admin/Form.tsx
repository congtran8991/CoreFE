import * as yup from "yup";
import { memo, useCallback } from "react";
import { Button, Checkbox, FormControlLabel, Grid } from "@mui/material";
import { Controller } from "react-hook-form";
import { useResolverForm } from "@hooks/lib/useResolverForm";
import { KInput, KForm } from "@uikit";
import { useMutationAddUser, useMutationUpdateUser } from "@hooks/user";
import PortalHandle from "@utils/portal";

interface IForm {
  id?: string | number;
  email: string;
  password: string;
  isSuperAdmin: boolean;
  isActive: boolean;
  retryPassword: string;
}
const FormUser = ({ item }: any) => {
  const isEdit = !!item?.id;

  const { mutate: addUserMutation } = useMutationAddUser();
  const { mutate: updateUserMutation } = useMutationUpdateUser();

  const methods = useResolverForm<IForm>({
    schema: yup.object().shape({
      email: yup.string().email().required(),
      password: yup
        .string()
        .test("password", "Required Field", function (password) {
          const isEdit = !!this.parent?.id;
          if (isEdit) {
            return true;
          } else {
            return !!password;
          }
        }),
      retryPassword: yup
        .string()
        .test("retryPassword1", "Required Field", function (retryPassword) {
          const isEdit = !!this.parent?.id;

          if (isEdit) {
            return true;
          }
          return !!retryPassword;
        })
        .test(
          "retryPassword",
          "Try Again Incorrect Password",
          function (retryPassword) {
            const password = this.parent?.password;
            if (password?.toString() === retryPassword?.toString()) {
              return true;
            }
            return false;
          }
        ),
    }),
    configs: {
      values: {
        id: item?.id,
        email: item?.email ?? "",
        password: item?.password ?? "",
        retryPassword: "",
        isSuperAdmin: item?.is_super_admin ?? false,
        isActive: item?.is_active ?? true,
      },
    },
  });

  const handleSubmit = useCallback(
    (_param: IForm) => {
      if (isEdit) {
        updateUserMutation(_param);
      } else {
        addUserMutation(_param);
      }
    },
    [addUserMutation, isEdit, updateUserMutation]
  );
  return (
    <KForm onSubmit={methods.handleSubmit(handleSubmit)}>
      <Grid container spacing={1.5}>
        <Grid size={{ xs: 12 }}>
          <Controller
            name={`email`}
            control={methods.control}
            render={({ field, fieldState: { error } }) => (
              <KInput.Base
                {...field}
                size="small"
                label="Email"
                message={error?.message}
                inputLabel={{ shrink: true }}
                disabled={isEdit}
                required
              />
            )}
          />
        </Grid>
        {!isEdit && (
          <Grid size={{ xs: 12 }}>
            <Controller
              name={`password`}
              control={methods.control}
              render={({ field, fieldState: { error } }) => (
                <KInput.Base
                  {...field}
                  size="small"
                  label="Password"
                  type="password"
                  message={error?.message}
                  inputLabel={{ shrink: true }}
                  required
                />
              )}
            />
          </Grid>
        )}

        {!isEdit && (
          <Grid size={{ xs: 12 }}>
            <Controller
              name={`retryPassword`}
              control={methods.control}
              render={({ field, fieldState: { error } }) => (
                <KInput.Base
                  {...field}
                  size="small"
                  label="Retry Password"
                  type="password"
                  message={error?.message}
                  inputLabel={{ shrink: true }}
                  required
                />
              )}
            />
          </Grid>
        )}

        <Grid size={{ xs: 6 }}>
          <Controller
            name={`isSuperAdmin`}
            control={methods.control}
            render={({ field }) => (
              <FormControlLabel
                {...field}
                control={<Checkbox />}
                label="Super Admin"
                checked={field.value}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Controller
            name={`isActive`}
            control={methods.control}
            render={({ field }) => (
              <FormControlLabel
                {...field}
                control={<Checkbox />}
                label="Active"
                checked={field.value}
              />
            )}
          />
        </Grid>

        <Grid marginTop={"1rem"} size={{ xs: 12 }} textAlign={"right"}>
          <Button
            variant="contained"
            size="small"
            color="error"
            sx={{ marginRight: "0.5rem" }}
            onClick={() => {
              PortalHandle.popup.dismiss();
            }}
          >
            Cancel
          </Button>

          <Button variant="contained" type="submit" size="small">
            Save
          </Button>
        </Grid>
      </Grid>
    </KForm>
  );
};

export default memo(FormUser);

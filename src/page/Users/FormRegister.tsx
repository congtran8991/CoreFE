import * as yup from "yup";
import { memo, useCallback } from "react";
import { Button, Grid } from "@mui/material";
import { Controller } from "react-hook-form";
import { useResolverForm } from "@hooks/lib/useResolverForm";
import { KInput, KForm } from "@uikit";
import { useMutationRegister } from "@hooks/user";

interface IFormRegister {
  email: string;
  password: string;
  retryPassword: string;
}
const FormRegister = () => {
  const { mutate: registerMutation } = useMutationRegister();
  const methods = useResolverForm<IFormRegister>({
    schema: yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required("Required Field"),
      retryPassword: yup
        .string()
        .required("Required Field")
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
        email: "",
        password: "",
        retryPassword: "",
      },
    },
  });

  const handleSubmit = useCallback(
    (_param: IFormRegister) => {
      registerMutation(_param);
    },
    [registerMutation]
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
                horizontal={false}
                required
              />
            )}
          />
        </Grid>
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
                horizontal={false}
                required
              />
            )}
          />
        </Grid>

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
                horizontal={false}
                required
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12 }} textAlign={"center"}>
          <Button variant="contained" type="submit" size="small">
            Register
          </Button>
        </Grid>
      </Grid>
    </KForm>
  );
};

export default memo(FormRegister);

import * as yup from "yup";
import { memo, useCallback } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { useResolverForm } from "@hooks/lib/useResolverForm";
import { KInput, KForm } from "@uikit";
import { useMutationLoginUser } from "@hooks/user";

interface IFormLogin {
  email: string;
  password: string;
}
const FormLogin = () => {
  const methods = useResolverForm<IFormLogin>({
    schema: yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required("Required Field"),
    }),
    configs: {
      values: {
        email: "",
        password: "",
      },
    },
  });

  const { mutate: mutateLogin, isPending } = useMutationLoginUser();

  const handleSubmit = useCallback(
    (_param: IFormLogin) => {
      mutateLogin({
        email: _param.email,
        password: _param.password,
      });
    },
    [mutateLogin]
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
        <Box width="100%" display={"flex"} justifyContent={"space-between"}>
          <Box>
            <Typography
              variant="caption"
              color="primary"
              sx={{ cursor: "pointer" }}
            >
              Signup
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="caption"
              color="primary"
              sx={{ cursor: "pointer" }}
            >
              Forgot your password?
            </Typography>
          </Box>
        </Box>
        <Grid size={{ xs: 12 }} textAlign={"center"}>
          <Button variant="contained" type="submit" size="small">
            Login
          </Button>
        </Grid>
      </Grid>
    </KForm>
  );
};

export default memo(FormLogin);

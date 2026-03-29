import { useForm, FieldValues, UseFormProps } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const useResolverForm = <T extends FieldValues>({
  schema,
  configs,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: any;
  configs: UseFormProps<T>;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useForm<T>({ ...configs, resolver: yupResolver(schema) as any });
};

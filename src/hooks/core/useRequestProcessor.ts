import {
  DefaultError,
  DefinedInitialDataOptions,
  MutateOptions,
  MutationKey,
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useCallback } from "react";

export const useQueryEnhancer = <
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>
) => {
  const props = useQuery(options);
  return { ...props, isLoading: props.isRefetching || props.isFetching };
};

export const useMutationEnhancer = <
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TOnMutateResult = unknown,
>(
  options: UseMutationOptions<TData, TError, TVariables, TOnMutateResult> & {
    invalidateQueryKeys?: Array<MutationKey>;
  }
) => {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, ...rest } = useMutation<
    TData,
    TError,
    TVariables,
    TOnMutateResult
  >({
    ...options,
    onSuccess(data, variables, onMutateResult, context) {
      if (options.invalidateQueryKeys) {
        options.invalidateQueryKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: [key], type: "active" });
        });
      }
      options.onSuccess?.(data, variables, onMutateResult, context)
    },
  });

  const mutateEnhancer = useCallback(
    (
      variables: TVariables,
      mutateOption: MutateOptions<TData, TError, TVariables, TOnMutateResult>
    ) => {
      return mutate(variables, mutateOption);
    },
    [mutate]
  );

  const mutateAsyncEnhancer = useCallback(
    (
      v?: TVariables,
      o?: MutateOptions<TData, TError, TVariables, TOnMutateResult> | undefined
    ): Promise<TData> => {
      return mutateAsync(v as TVariables, o);
    },
    [mutateAsync]
  );

  return {
    mutate: mutateEnhancer,
    mutateAsync: mutateAsyncEnhancer,
    ...rest,
  };
};

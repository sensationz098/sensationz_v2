import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";

export const useReactQuery = <TData, TError = Error>(
  queryKey: readonly string[],
  queryFn: () => Promise<TData>,
  options?: UseQueryOptions<TData, TError>
): UseQueryResult<TData, TError> => {
  return useQuery({
    queryKey,
    queryFn,
    // staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: true,
    ...options,
  });
};

export const useReactMutation = <
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown
>(
  mutationKey: readonly string[],
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, TError, TVariables, TContext>
): UseMutationResult<TData, TError, TVariables, TContext> => {
  return useMutation({
    mutationKey,
    mutationFn,
    ...options,
  });
};

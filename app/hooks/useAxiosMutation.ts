import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface ErrorResponse {
  error: string;
}

export const useAxiosMutation = <TData, TVariables>({
  ...options
}: UseMutationOptions<
  TData,
  AxiosError<ErrorResponse>,
  TVariables,
  unknown
>) => {
  return useMutation<TData, AxiosError<ErrorResponse>, TVariables>({
    ...options,
  });
};

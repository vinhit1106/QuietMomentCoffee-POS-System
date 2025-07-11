import { AxiosError } from "axios";

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const response = error.response;

    if (response?.data) {
      const data = response.data as any;

      return (
        data.message ||
        data.error?.message ||
        data.data?.message ||
        data.detail ||
        `HTTP ${response.status}: ${response.statusText}`
      );
    }

    return error.message || "Network error";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unknown error occurred";
};

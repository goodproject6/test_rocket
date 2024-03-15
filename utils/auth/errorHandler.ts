import { AxiosError } from "axios";


export const handleAxiosError = (error: any): never => {
  if (error instanceof AxiosError) {
    throw new Error(error.response?.status.toString());
  }
  throw error;
};

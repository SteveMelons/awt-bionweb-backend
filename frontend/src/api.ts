import axios from "axios";
import useAxios, { Options } from "axios-hooks";
import { FieldError } from "./types/errors";

interface UseApiArgs {
  method: "GET" | "POST" | "DELETE";
  url: string;
  data?: any;
  options?: Options;
}

interface LoginArgs {
  usernameOrEmail: string;
  password: string;
}

interface LoginRes {
  id: string;
  errors: FieldError[];
}

const useApi = <TRes, TErr>({ method, url, data, options }: UseApiArgs) => {
  return useAxios<TRes, TErr>({ baseURL: "/api/", method, url, data }, options);
};

/* API ROUTES */

export const useGetHelloWorld = () => {
  return useApi<string, string>({ method: "GET", url: "/" });
};

export const login = (args: LoginArgs) => {
  return axios.post<LoginRes>("/api/login", args);
  // return useApi<UseLoginRes, FieldError>({
  //   method: "POST",
  //   url: "/login",
  //   data: args,
  // });
};

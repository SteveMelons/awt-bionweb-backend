import useAxios, { Options } from "axios-hooks";

interface UseApiArgs {
  method: "GET" | "POST" | "DELETE";
  url: string;
  data?: any;
  options?: Options;
}

export const useApi = <TRes, TErr>({
  method,
  url,
  data,
  options,
}: UseApiArgs) => {
  return useAxios<TRes, TErr>({ baseURL: "/api/", method, url, data }, options);
};

/* API ROUTES */

export const useGetHelloWorld = () => {
  return useApi<string, string>({ method: "GET", url: "/" });
};

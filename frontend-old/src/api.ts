import axios from "axios";
import useAxios, { Options } from "axios-hooks";
import { FieldError } from "./types/errors";
import { Message } from "./types/types";
import { Me, User } from "./types/User";

const axiosApi = axios.create({
  baseURL: "/api/",
});

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

interface IdRes {
  id: string;
}

interface RegisterArgs {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface AddFavoriteArgs {
  favoriteId: string;
}

interface GetUsersArgs {
  params: {
    limit?: number;
    offset?: number;
  };
  filters?: FiltersInterface;
}

export interface FiltersInterface {
  courses: BasicEntity[];
  languages: BasicEntity[];
  preferences: BasicEntity[];
  skills: BasicEntity[];
  studyprogram: BasicEntity[];
  university: BasicEntity[];
}

export interface BasicEntity {
  id: string;
  name: string;
}

const useApi = <TRes, TErr = any>({
  method,
  url,
  data,
  options,
}: UseApiArgs) => {
  return useAxios<TRes, TErr>({ baseURL: "/api/", method, url, data }, options);
};

/* API ROUTES */

export const useGetUserById = (id?: string) => {
  return useApi<Me | User, void>({
    method: "GET",
    url: id ? `/user/${id}` : "/user",
  });
};

export const useGetUser = () => {
  return useApi<Me, void>({ method: "GET", url: "/user" });
};

export const getUsers = (args: GetUsersArgs) => {
  return axiosApi.post<User[]>(
    "/users",
    { filters: args.filters },
    { params: args.params }
  );
};

export const useGetFavorites = () => {
  return useApi<User[], void>({ method: "GET", url: "/favorites" });
};

export const useGetUsers = (args?: GetUsersArgs) => {
  return useApi<User[], void>({ method: "GET", url: "/users" });
};

export const useGetFilters = () => {
  return useApi<FiltersInterface, void>({ method: "GET", url: "/filters" });
};

export const useMe = () => {
  return useApi<IdRes | null>({ method: "GET", url: "/me" });
};

export const login = (args: LoginArgs) => {
  return axiosApi.post<LoginRes>("/login", args);
};

export const getStudyprograms = () => {
  return axiosApi.get<BasicEntity[]>("/studyprograms");
};

export const getUniversities = () => {
  return axiosApi.get<BasicEntity[]>("/universities");
};

export const getLanguages = () => {
  return axiosApi.get<BasicEntity[]>("/languages");
};

export const getCourses = () => {
  return axiosApi.get<BasicEntity[]>("/courses");
};

export const getMessages = ({ profileId }: { profileId: string }) => {
  return axiosApi.get<Message[]>("/messages", {
    params: { profileId },
  });
};

export const getPreferences = () => {
  return axiosApi.get<BasicEntity[]>("/preferences");
};

export const logout = () => {
  return axiosApi.post<boolean>("/logout");
};

export const register = (args: RegisterArgs) => {
  return axiosApi.post<LoginRes>("/register", args);
};

export const addFavorite = (args: AddFavoriteArgs) => {
  return axiosApi.post<boolean>("/favorites/add", args);
};

export const removeFavorite = (args: AddFavoriteArgs) => {
  return axiosApi.delete<boolean>(`/favorites/remove/${args.favoriteId}`);
};

import { User } from "../entities/User";

export const filterUser = (user: User) => {
  const { _id, updatedAt, password, ...res } = user;
  res.id = user._id as any as string;

  return res;
};

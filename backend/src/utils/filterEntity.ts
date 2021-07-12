import { User } from "../entities/User";
import { UpdateUserArgs } from "../types/args";

export const filterUser = (user: User) => {
  const { _id, updatedAt, password, ...res } = user;
  res.id = user._id as any as string;

  return res;
};

export const filterUserFavorite = (user: User) => {
  const { _id, updatedAt, password, favorites, ...res } = user;
  res.id = user._id as any as string;

  return res;
};

export const filterNullInput = (user: UpdateUserArgs) => {
  let notNullProps: any = [];
  for (let prop in user) {
    if ((user as any)[prop] !== (null || undefined)) {
      notNullProps.push(prop);
    }
  }
  return notNullProps;
};

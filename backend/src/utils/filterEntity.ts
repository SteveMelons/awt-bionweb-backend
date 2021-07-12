import { User } from "../entities/User";

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

export const filterNullInput = (user: any) => {
  let notNullProps: any = [];
  for (let prop in user){
    if (Array.isArray(user[prop]) && user[prop].length == 0) continue;
    if (user[prop] != null ){
      notNullProps.push(prop);
    }
  }
  return notNullProps;
}

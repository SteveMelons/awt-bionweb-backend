import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";

export const formResponse = (
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>,
  entity: string,
  blacklist: string[]
) => {
  const meta = em.getMetadata().get(entity);
  return {
    fields: Object.keys(meta.properties).filter(
      (prop) => !blacklist.includes(prop)
    ),
  };
};

export const formResponseUser = (
  em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>
) => {
  return formResponse(em, "User", ["_id", "password", "updatedAt"]);
};

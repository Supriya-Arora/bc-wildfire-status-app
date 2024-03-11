import { FireDataFilter } from "./types";

export const filter = (filter: FireDataFilter) => {
  const filterString = [];
  for (let key in filter) {
    if (filter[key as keyof FireDataFilter]) {
      filterString.push(`${key}='${filter[key as keyof FireDataFilter]}'`);
    }
  }

  if (filterString.length > 0) {
    return filterString.join(" AND ");
  }
  return "";
};

export const getAllWildfires = (
  count: string,
  FIRE_CAUSE: string,
  FIRE_STATUS: string,
  GEOGRAPHIC_DESCRIPTION: string
) => {
  if (FIRE_CAUSE || FIRE_STATUS || GEOGRAPHIC_DESCRIPTION) {
    return process.env.WILDFIRE_API_URL + `&cql_filter=${filter({ FIRE_CAUSE, FIRE_STATUS, GEOGRAPHIC_DESCRIPTION })}`;
  }
  if (count) {
    return process.env.WILDFIRE_API_URL + `&count=${count}`;
  }
  return process.env.WILDFIRE_API_URL;
};
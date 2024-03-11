import { FireDataFilter, FireFeature } from "./types";

/**
 * Returns an array of unique filter options.
 * @param optionsData The data to generate filter options from.
 */
export const generateFilterOptions = (
  optionsData: FireFeature[],
  property: keyof FireFeature["properties"]
): string[] => {
  const properties = optionsData.map((fire) => fire.properties[property]);
  const uniqueProperties = new Set(properties);
  return Array.from(uniqueProperties) as string[];
};

/**
 * Takes in filter values and returns a string of the filter parameters.
 * @param filter The filter parameters.
 */
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

/**
 * Takes in query parameters and returns a url string.
 * @param count
 * @param FIRE_CAUSE
 * @param FIRE_STATUS
 * @param GEOGRAPHIC_DESCRIPTION
 */
export const getAllWildfiresURL = (
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
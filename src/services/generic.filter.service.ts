/**
 * @file Generic service functions for filtering arrays of objects.
 * @module services/generic.filter.service
 */

/**
 * A generic type representing a record with string keys and any values.
 * @typedef {Record<string, any>} GenericObject
 */
type GenericObject = Record<string, any>;

/**
 * Filters an array of objects by exact match on a specified property.
 * @template T
 * @param {T[]} data - The array of objects to filter.
 * @param {keyof T} key - The property key to filter on.
 * @param {any} value - The value to match exactly.
 * @returns {T[]} The filtered array.
 */
export const filterByExactMatch = <T extends GenericObject>(
  data: T[],
  key: keyof T,
  value: any
): T[] => {
  if (value === undefined || value === null) {
    return data;
  }
  return data.filter((item) => item[key] === value);
};

/**
 * Filters an array of objects by a numeric or date range.
 * @template T
 * @param {T[]} data - The array of objects to filter.
 * @param {keyof T} key - The property key to apply the range filter on.
 * @param {number | Date | undefined} min - The minimum value of the range (inclusive).
 * @param {number | Date | undefined} max - The maximum value of the range (inclusive).
 * @returns {T[]} The filtered array.
 */
export const filterByRange = <T extends GenericObject>(
  data: T[],
  key: keyof T,
  min: number | Date | undefined,
  max: number | Date | undefined
): T[] => {
  let filteredData = [...data];
  if (min !== undefined) {
    filteredData = filteredData.filter((item) => item[key] >= min);
  }
  if (max !== undefined) {
    filteredData = filteredData.filter((item) => item[key] <= max);
  }
  return filteredData;
};

/**
 * Filters an array of objects where a property's value is included in a given array.
 * @template T
 * @param {T[]} data - The array of objects to filter.
 * @param {keyof T} key - The property key to check.
 * @param {any[]} values - The array of values to match against.
 * @returns {T[]} The filtered array.
 */
export const filterByArray = <T extends GenericObject>(
  data: T[],
  key: keyof T,
  values: any[]
): T[] => {
  if (!values || values.length === 0) {
    return data;
  }
  return data.filter((item) => values.includes(item[key]));
};

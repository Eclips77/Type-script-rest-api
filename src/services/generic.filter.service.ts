/**
 * @file Generic service functions for filtering arrays of objects.
 * @module services/generic.filter.service
 */
import Fuse from 'fuse.js';

type GenericObject = Record<string, any>;

/**
 * Filters an array of objects by exact match on a specified property.
 * @template T
 * @param {T[]} data - The array of objects to filter.
 * @param {keyof T} key - The property key to filter on.
 * @param {any} value - The value to match exactly.
 * @returns {T[]} The filtered array.
 */
export const filterByExactMatch = <T extends GenericObject>(data: T[], key: keyof T, value: any): T[] => {
  if (value === undefined || value === null) return data;
  return data.filter((item) => item[key] === value);
};

/**
 * Filters an array of objects by a numeric or date range.
 * @template T
 * @param {T[]} data - The array of objects to filter.
 * @param {keyof T} key - The property key to apply the range filter on.
 * @param {{ min?: number | Date; max?: number | Date }} range - An object with min and/or max values.
 * @returns {T[]} The filtered array.
 */
export const filterByRange = <T extends GenericObject>(data: T[], key: keyof T, range: { min?: number | Date; max?: number | Date }): T[] => {
  let filteredData = data;
  if (range.min !== undefined) {
    filteredData = filteredData.filter((item) => item[key] >= range.min!);
  }
  if (range.max !== undefined) {
    filteredData = filteredData.filter((item) => item[key] <= range.max!);
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
export const filterByArray = <T extends GenericObject>(data: T[], key: keyof T, values: any[]): T[] => {
  if (!values || values.length === 0) return data;
  return data.filter((item) => values.includes(item[key]));
};

/**
 * Performs a fuzzy search on an array of objects using Fuse.js.
 * @template T
 * @param {T[]} data - The array of objects to search.
 * @param {(keyof T)[]} keys - The property keys to search within.
 * @param {string} searchTerm - The term to search for.
 * @returns {T[]} The search results.
 */
export const filterByFuzzyMatch = <T extends GenericObject>(data: T[], keys: (keyof T)[], searchTerm: string): T[] => {
  if (!searchTerm) return data;
  const fuse = new Fuse(data, { keys: keys as string[], threshold: 0.4 });
  return fuse.search(searchTerm).map((result) => result.item);
};

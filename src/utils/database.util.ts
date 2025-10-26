/**
 * @file Database utility functions for reading from and writing to the JSON database file.
 * @module utils/database.util
 */

import { promises as fs } from 'fs';
import { Video } from '../schemas/video.schema';

/**
 * The path to the JSON database file.
 * @constant {string}
 */
const dbPath = './data/videos.json';

/**
 * Reads the video database from the JSON file.
 * If the file does not exist or is empty, it returns an empty array.
 * @async
 * @function readDatabase
 * @returns {Promise<Video[]>} A promise that resolves to an array of video objects.
 */
export const readDatabase = async (): Promise<Video[]> => {
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist, return an empty array.
    return [];
  }
};

/**
 * Writes an array of video objects to the JSON database file.
 * This will overwrite the existing file.
 * @async
 * @function writeDatabase
 * @param {Video[]} data - The array of video objects to write to the database.
 * @returns {Promise<void>} A promise that resolves when the file has been written.
 */
export const writeDatabase = async (data: Video[]): Promise<void> => {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
};

/**
 * Initializes the database.
 * Checks if the database file exists, and if not, creates it with an empty array.
 * This prevents errors on the first run.
 * @async
 * @function initDatabase
 * @returns {Promise<void>} A promise that resolves when the database is initialized.
 */
export const initDatabase = async (): Promise<void> => {
  try {
    await fs.access(dbPath);
  } catch (error) {
    // If the file doesn't exist, create it with an empty array.
    await writeDatabase([]);
  }
};

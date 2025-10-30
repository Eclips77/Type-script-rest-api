/**
 * @file Database utility functions for reading from and writing to JSON database files.
 * @module utils/database.util
 */

import { promises as fs } from 'fs';
import path from 'path';

const dbDirectory = path.join(process.cwd(), 'data');

/**
 * Reads data from a specified JSON file.
 * @param {string} fileName - The name of the JSON file (e.g., 'videos.json').
 * @returns {Promise<any[]>} A promise that resolves to an array of data.
 */
export function readDatabase(fileName) {
  const filePath = path.join(dbDirectory, fileName);
  return fs.readFile(filePath, 'utf-8')
    .then(data => JSON.parse(data))
    .catch(error => {
      // If the file doesn't exist, return an empty array.
      if (error.code === 'ENOENT') {
        return [];
      }
      throw error;
    });
}

/**
 * Writes data to a specified JSON file.
 * @param {string} fileName - The name of the JSON file.
 * @param {any[]} data - The data to write.
 * @returns {Promise<void>} A promise that resolves when the file has been written.
 */
export function writeDatabase(fileName, data) {
  const filePath = path.join(dbDirectory, fileName);
  return fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

/**
 * Initializes the database directory and files if they don't exist.
 * @returns {Promise<void>}
 */
export function initDatabase() {
    return fs.mkdir(dbDirectory, { recursive: true })
        .then(() => Promise.all([
            writeDatabase('videos.json', []),
            writeDatabase('playlists.json', [])
        ]));
}

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
 * Ensures a database file exists. If not, it creates it with initial data.
 * @param {string} fileName - The name of the database file.
 * @param {any[]} initialData - The initial data to write if the file doesn't exist.
 * @returns {Promise<void>}
 */
function ensureDbFile(fileName, initialData = []) {
    const filePath = path.join(dbDirectory, fileName);
    return fs.access(filePath)
        .catch(() => {
            // File doesn't exist, so create it.
            return writeDatabase(fileName, initialData);
        });
}


/**
 * Initializes the database directory and files if they don't exist.
 * @returns {Promise<void>}
 */
export function initDatabase() {
    return fs.mkdir(dbDirectory, { recursive: true })
        .then(() => Promise.all([
            ensureDbFile('videos.json'),
            ensureDbFile('playlists.json'),
            ensureDbFile('genres.json', [
                { id: '1', name: 'Comedy' }, { id: '2', name: 'Horror' },
                { id: '3', name: 'Action' }, { id: '4', name: 'Animation' },
                { id: '5', name: 'Drama' }, { id: '6', name: 'Sci-Fi' },
                { id: '7', name: 'Documentary' }, { id: '8', name: 'Thriller' }
            ])
        ]));
}

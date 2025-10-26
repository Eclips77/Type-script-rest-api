import { promises as fs } from 'fs';
import { Video } from '../schemas/video.schema';

const dbPath = './data/videos.json';

export const readDatabase = async (): Promise<Video[]> => {
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

export const writeDatabase = async (data: Video[]): Promise<void> => {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
};

export const initDatabase = async (): Promise<void> => {
  try {
    await fs.access(dbPath);
  } catch (error) {
    await writeDatabase([]);
  }
};

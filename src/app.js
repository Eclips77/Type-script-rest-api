import express from 'express';
import { videoRoutes, playlistRoutes, genreRoutes } from './routes/index.js';
import { initDatabase } from './utils/index.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/videos', videoRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/genres', genreRoutes);

initDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.error("Failed to initialize the database:", error);
    process.exit(1);
  });

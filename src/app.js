import express from 'express';
import videoRoutes from './routes/video.routes.js';
import playlistRoutes from './routes/playlist.routes.js';
import { errorHandler } from './middleware/errorHandler.middleware.js';
import { initDatabase } from './utils/database.util.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/videos', videoRoutes);
app.use('/api/playlists', playlistRoutes);

app.use(errorHandler);

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

import express from 'express';
import videoRoutes from './routes/video.routes';
import { errorHandler } from './middleware/errorHandler.middleware';
import { initDatabase } from './utils/database.util';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/videos', videoRoutes);

app.use(errorHandler);

initDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});

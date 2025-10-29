import express from 'express';
import videoRoutes from './routes/video.routes';
import { errorHandler } from './middleware/errorHandler.middleware';
import { connectDB } from './utils/db.util';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/videos', videoRoutes);

app.use(errorHandler);

async function startServer() {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

startServer();

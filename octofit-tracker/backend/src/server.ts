import express, { type Request } from 'express';
import mongoose from 'mongoose';
import apiRoutes from './routes/api';

interface AppRequest extends Request {
  apiBaseUrl?: string;
}

interface AppResponse {
  json(payload: unknown): unknown;
}

const app = express();
const port = Number(process.env.PORT || 8000);
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());
app.use('/api', (req: AppRequest, _res: AppResponse, next: () => void) => {
  req.apiBaseUrl = apiBaseUrl;
  next();
});
app.use('/api', apiRoutes);

app.get('/api/health', (_req: Request, res: AppResponse) => {
  res.json({ status: 'ok', service: 'octofit-backend' });
});

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, '0.0.0.0', () => {
      console.log(`Backend listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  });

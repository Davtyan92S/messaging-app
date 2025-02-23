import http from 'http';
import { connectDB } from './config/database';
import { initWebSocketServer } from './services/websocket.service';
import { PORT } from './config/env';
import app from './app';

const startServer = async () => {
  await connectDB();
  const server = http.createServer(app);
  initWebSocketServer(server);
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();

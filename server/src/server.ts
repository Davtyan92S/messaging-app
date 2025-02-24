import http from 'http';
import { connectDB } from './config/database';
import { initWebSocketServer } from './services/websocket.service';
import { PORT } from './config/env';
import app from './app';

const startServer = async () => {
  try {
    await connectDB(); 
    const server = http.createServer(app);
    initWebSocketServer(server);

    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Server startup error:', error);
    process.exit(1);
  }
};

startServer();

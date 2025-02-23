import { WebSocketServer } from 'ws';
import { db } from '../config/database';
import redis from '../config/redisClient';

export const initWebSocketServer = async (server: any) => {
  const wss = new WebSocketServer({ server });

  wss.on('connection', ws => {
    console.log('WebSocket client connected');
    ws.on('close', () => console.log('WebSocket client disconnected'));
  });

  let resumeToken = await redis.get('resumeToken');
  if (resumeToken) {
    resumeToken = JSON.parse(resumeToken);
  }
  const changeStream = db
    .collection('messages')
    .watch([], resumeToken ? { resumeAfter: resumeToken } : {});

  changeStream.on('change', async change => {
    if (change.operationType === 'insert') {
      const newMessage = change.fullDocument;
      wss.clients.forEach(client => client.send(JSON.stringify(newMessage)));
    }

    if (change._id) {
      await redis.set('resumeToken', JSON.stringify(change._id));
    }
  });

  changeStream.on('error', error => {
    console.error('ChangeStream error:', error);
  });
};

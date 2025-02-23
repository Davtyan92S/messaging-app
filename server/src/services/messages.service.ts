import redis from '../config/redisClient';
import { BATCH_SIZE, MESSAGE_BUFFER_KEY, TIMEOUT_MS } from '../constants';
import { saveMessagesBatch, getAllMessages } from '../repositories/messages.repository';
import { Message } from '../types/message';

let timeout: NodeJS.Timeout | null = null;

export const addMessageToBuffer = async (messageWithUser: Message) => {
  await redis.rpush(MESSAGE_BUFFER_KEY, JSON.stringify(messageWithUser));

  const bufferLength = await redis.llen(MESSAGE_BUFFER_KEY);

  if (bufferLength >= BATCH_SIZE) {
    await flushMessages();
  } else if (!timeout) {
    timeout = setTimeout(flushMessages, TIMEOUT_MS);
  }
};

const flushMessages = async () => {
  const bufferLength = await redis.llen(MESSAGE_BUFFER_KEY);
  if (bufferLength === 0) return;

  const messages = await redis.lrange(MESSAGE_BUFFER_KEY, 0, -1);
  const parsedMessages: Message[] = messages.map(msg => JSON.parse(msg));

  await saveMessagesBatch(parsedMessages);

  await redis.del(MESSAGE_BUFFER_KEY);

  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
};

export const fetchAllMessages = async () => {
  return getAllMessages();
};

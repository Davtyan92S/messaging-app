import { db } from '../config/database';
import { Message } from '../types/message';

const messagesCollection = db.collection<Message>('messages');

export const saveMessagesBatch = async (messages: Message[]) => {
  // await messagesCollection.deleteMany({});
  return messagesCollection.insertMany(messages);
};

export const getAllMessages = async () => {
  return messagesCollection.find().toArray();
};

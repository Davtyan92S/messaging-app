import { db } from '../config/database';
import { Message } from '../types/message';

const messagesCollection = db.collection<Message>('messages');

export const saveMessagesBatch = async (messages: Message[]) => {
  try {
    return await messagesCollection.insertMany(messages);
  } catch (error) {
    console.error('Error saving messages batch:', error);
    throw new Error('Failed to save messages');
  }
};

export const getAllMessages = async () => {
  try {
    return await messagesCollection.find().toArray();
  } catch (error) {
    console.error(' Error fetching messages:', error);
    throw new Error('Failed to fetch messages');
  }
};

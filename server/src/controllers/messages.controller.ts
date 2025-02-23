import { Request, Response } from 'express';
import { addMessageToBuffer, fetchAllMessages } from '../services/messages.service';

export const postMessage = async (req: Request, res: Response): Promise<void> => {
  const { text, username } = req.body;
  if (!text || !username) {
    res.status(400).json({ error: 'Text and username are required' });
    return;
  }

  await addMessageToBuffer({ text, timestamp: new Date(), username });
  res.status(200).json({ message: 'Message received' });
};

export const getMessages = async (req: Request, res: Response): Promise<void> => {
  const messages = await fetchAllMessages();
  res.status(200).json(messages);
};

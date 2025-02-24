import { Request, Response } from 'express';
import { addMessageToBuffer, fetchAllMessages } from '../services/messages.service';

export const postMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { text, username } = req.body;

    if (!text || !username) {
      res.status(400).json({ error: 'Text and username are required' });
      return;
    }
    await addMessageToBuffer({ text, timestamp: new Date(), username });
    res.status(201).json({ message: 'Message received' });
  } catch (error) {
    console.error('Error in postMessage:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    const messages = await fetchAllMessages();
    res.status(200).json(messages);
  } catch (error) {
    console.error(' Error in getMessages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

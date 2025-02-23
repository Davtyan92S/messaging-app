import { api } from './axiosInstance';

export const fetchMessages = async () => {
  try {
    const response = await api.get('/messages');
    return response.data;
  } catch (error: unknown) {
    console.error('Error fetching messages:', error);
    throw new Error(
      `Failed to fetch messages. Please try again later. ${
        error instanceof Error ? error.message : ''
      }`,
    );
  }
};

export const sendMessage = async ({ username, text }: { username: string; text: string }) => {
  try {
    const response = await api.post('/messages', { username, text });
    return response.data;
  } catch (error: unknown) {
    throw new Error(
      `Failed to send message. Please check your connection and try again. ${
        error instanceof Error ? error.message : ''
      }`,
    );
  }
};

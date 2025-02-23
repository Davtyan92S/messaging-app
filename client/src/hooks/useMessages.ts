import { useQuery } from '@tanstack/react-query';
import { fetchMessages } from '../api/messages';
import { MESSAGES_KEY } from '../constants';
import { Message } from '../types';

export const useMessages = () => {
  return useQuery<Message[]>({
    queryKey: [MESSAGES_KEY],
    queryFn: fetchMessages,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};

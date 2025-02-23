import { FC } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Chat from './components/Chat';
import { WebSocketProvider } from './provider/WebSocketProvider';

const queryClient = new QueryClient();

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <WebSocketProvider>
        <Chat />
      </WebSocketProvider>
    </QueryClientProvider>
  );
};

export default App;

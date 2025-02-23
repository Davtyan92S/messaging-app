import { FC, memo } from 'react';
import { Card } from 'antd';
import MessageList from '../MessageList';
import MessageInput from '../MessageInput';

interface ChatWindowProps {
  username: string;
}

const ChatWindow: FC<ChatWindowProps> = ({ username }) => {
  return (
    <Card>
      <MessageList username={username} />
      <MessageInput username={username} />
    </Card>
  );
};

export default memo(ChatWindow);

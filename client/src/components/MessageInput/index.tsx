import { useState, useCallback, FC, memo } from 'react';
import { Input, Button, Space } from 'antd';
import { useSendMessage } from '../../hooks/useSendMessage';

interface MessageInputProps {
  username: string;
}

const MessageInput: FC<MessageInputProps> = ({ username }) => {
  const [message, setMessage] = useState('');
  const { mutate } = useSendMessage();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  }, []);

  const handleSendMessage = useCallback(() => {
    if (message.trim()) {
      mutate({ username, text: message });
      setMessage('');
    }
  }, [message, username, mutate]);

  return (
    <Space.Compact style={{ width: '100%', marginTop: 10 }}>
      <Input
        placeholder="Введите сообщение..."
        value={message}
        onChange={handleChange}
        onPressEnter={handleSendMessage}
      />
      <Button type="primary" onClick={handleSendMessage}>
        Отправить
      </Button>
    </Space.Compact>
  );
};

export default memo(MessageInput);

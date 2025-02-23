import { FC, memo, useEffect, useRef } from 'react';
import { List } from 'antd';
import { useMessages } from '../../hooks/useMessages';
import styles from './style.module.css';
import MessageItem from '../MessageItem';

interface MessageListProps {
  username: string;
}

const MessageList: FC<MessageListProps> = ({ username }) => {
  const { data: messages, isLoading } = useMessages();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  if (!username) return null;
  if (isLoading) return <p>Загрузка...</p>;
  if (!messages?.length) return <p>Сообщений пока нет</p>;

  return (
    <div ref={listRef} className={styles.messageList}>
      <List
        dataSource={messages}
        renderItem={(msg) => <MessageItem username={msg.username} text={msg.text} />}
      />
    </div>
  );
};

export default memo(MessageList);

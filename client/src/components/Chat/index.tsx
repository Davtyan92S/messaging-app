import { useState, useEffect, useCallback, lazy, Suspense, memo, FC } from 'react';
import { Spin, Button, Card } from 'antd';
import { USERNAME_KEY } from '../../constants';
import UsernameInput from '../UsernameInput';
import styles from './style.module.css';

const ChatWindow = lazy(() => import('../ChatWindow'));

const Chat: FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const savedUsername = localStorage.getItem(USERNAME_KEY);
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const handleSetUsername = useCallback((name: string) => {
    localStorage.setItem(USERNAME_KEY, name);
    setUsername(name);
  }, []);

  const handleLeaveChat = useCallback(() => {
    localStorage.removeItem(USERNAME_KEY);
    setUsername(null);
  }, []);

  if (!username) {
    return <UsernameInput onUsernameSet={handleSetUsername} />;
  }

  return (
    <Card className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <h1>Чат</h1>
      </div>
      <Suspense fallback={<Spin size="large" className={styles.chatLoading} />}>
        <ChatWindow username={username} />
      </Suspense>
      {username && (
        <Button type="primary" danger onClick={handleLeaveChat} className={styles.leaveButton}>
          Покинуть чат
        </Button>
      )}
    </Card>
  );
};

export default memo(Chat);

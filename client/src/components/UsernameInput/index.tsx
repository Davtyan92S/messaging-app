import React, { useState, useEffect, useCallback, memo, FC } from 'react';
import { Input, Button, Card } from 'antd';
import { USERNAME_KEY } from '../../constants';
import styles from './style.module.css';

interface UsernameInputProps {
  onUsernameSet: (username: string) => void;
}

const UsernameInput: FC<UsernameInputProps> = memo(({ onUsernameSet }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const savedUsername = localStorage.getItem(USERNAME_KEY);
    if (savedUsername) {
      onUsernameSet(savedUsername);
    }
  }, [onUsernameSet]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }, []);

  const handleContinue = useCallback(() => {
    if (username.trim()) {
      localStorage.setItem(USERNAME_KEY, username);
      onUsernameSet(username);
    }
  }, [username, onUsernameSet]);

  return (
    <Card className={styles.card}>
      <h2>Введите имя</h2>
      <Input placeholder="Ваше имя..." value={username} onChange={handleChange} />
      <Button
        type="primary"
        className={styles.button}
        onClick={handleContinue}
        disabled={!username.trim()}
      >
        Продолжить
      </Button>
    </Card>
  );
});

export default memo(UsernameInput);

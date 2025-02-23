import { FC, memo } from 'react';
import { Avatar, Typography } from 'antd';
import styles from './style.module.css';

interface MessageItemProps {
  username: string;
  text: string;
}

const MessageItem: FC<MessageItemProps> = ({ username = 'Аноним', text }) => {
  const avatar = username?.charAt(0)?.toUpperCase();
  return (
    <div className={styles.messageItem}>
      <div className={styles.messageUser}>
        <Avatar className={styles.avatar}>{avatar}</Avatar>
        <Typography.Text className={styles.username} strong>
          {username}
        </Typography.Text>
      </div>
      <div className={styles.messageText}>
        <Typography.Text>{text}</Typography.Text>
      </div>
    </div>
  );
};

export default memo(MessageItem);

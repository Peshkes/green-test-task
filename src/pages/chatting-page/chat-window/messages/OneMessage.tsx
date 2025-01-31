import styles from './messages.module.css';
import {AnyMessage} from "../../../../features/chatting/chattingTypes.ts";

const OneMessage = ({ timestamp, messageData, status }: AnyMessage) => {
    const isOutgoing = !!status;
    const containerClass = `${styles.container} ${
        isOutgoing ? styles.outgoing : styles.incoming
    }`;

    const formatTime = (timestamp: number) => {
        const date = new Date(timestamp);
        return `${date.getHours().toString().padStart(2, '0')}:${date
            .getMinutes()
            .toString()
            .padStart(2, '0')}`;
    };

    return (
        <div className={containerClass}>
            <div className={styles.message}>{messageData.textMessageData.textMessage}</div>

            <div className={styles.timeStatusContainer}>
                <span className={styles.time}>{formatTime(timestamp)}</span>
                {isOutgoing && (
                    <span className={`${styles.status} ${status === 'read' ? styles.read : ''}`}>
            {status === 'sent' ? '✓' : '✓✓'}
          </span>
                )}
            </div>
        </div>
    );
};

export default OneMessage;


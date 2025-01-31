import styles from './ChatWindow.module.css';
import {useChat} from "../../../features/chatting/useChat.ts";
import SendMessageBlock from "./send-message-block/SendMessageBlock.tsx";
import Messages from "./messages/Messages.tsx";

export const ChatWindow = () => {
    const {selectedChat, chats} = useChat();
    const chat = chats.find(c => c.chatId === selectedChat);

    if (!chat) {
        return (
            <div className={styles.emptyChat}>
                <h2>Выберите чат чтобы начать общение</h2>
            </div>
        );
    }

    return (
        <div className={styles.chatWindow}>
            <div className={styles.chatHeader}>
                <div className={styles.avatar}/>
                <div className={styles.headerInfo}>
                    <h2>{chat.name || chat.contactName || chat.chatId}</h2>
                    <p>был(а) недавно</p>
                </div>
            </div>

            <div className={styles.messagesContainer}>
                <Messages/>
            </div>

            <SendMessageBlock/>
        </div>
    );
};

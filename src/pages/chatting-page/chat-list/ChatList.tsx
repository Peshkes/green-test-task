import styles from './ChatList.module.css';
import {useEffect} from 'react';
import ChatsGenerator from "./ChatsGenerator.tsx";
import AddChatBlock from "./add-chat-block/AddChatBlock.tsx";

export const ChatList = () => {

    useEffect(() => {
        // Инициализация чатов
    }, []);

    return (
        <div className={styles.chatList}>
            <AddChatBlock/>
            <div className={styles.chatsContainer}>
                <ChatsGenerator/>
            </div>
        </div>
    );
};

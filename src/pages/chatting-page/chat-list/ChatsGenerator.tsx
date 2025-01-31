import styles from "./chatList.module.css";
import {useChat} from "../../../features/chatting/useChat.ts";

const ChatsGenerator = () => {
    const { chats, selectChat, selectedChat } = useChat();
    return (
        <>
            {chats.map((chat) => (
                <div
                    key={chat.chatId}
                    className={styles.chatItem + (selectedChat === chat.chatId ? ' ' + styles.selected : '')}
                    onClick={() => selectChat(chat.chatId)}
                >
                    <div className={styles.avatar} >
                        <img src={chat.avatar} alt="avatar"/>
                    </div>
                    <div className={styles.chatInfo}>
                        <h3>{chat.name || chat.contactName || chat.chatId}</h3>
                    </div>
                </div>
            ))}
        </>
    )
}
export default ChatsGenerator

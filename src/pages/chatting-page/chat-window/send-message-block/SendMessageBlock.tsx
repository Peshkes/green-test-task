import styles from "../chatWindow.module.css";
import {useChat} from "../../../../features/chatting/useChat.ts";
import React, {useState} from "react";

const SendMessageBlock = () => {
    const {sendMessage, selectedChat} = useChat();
    const [value, setValue] = useState('');
    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (selectedChat && value) {
            await sendMessage(selectedChat, value);
            setValue("");
        }
    }
    return (
        <form className={styles.messageInput} onSubmit={onSubmit}>
            <input
                type="text"
                placeholder="Введите сообщение"
                onChange={event => setValue(event.target.value)}
                value={value}
            />
            <button type={"submit"}>Отправить</button>
        </form>
    )
}
export default SendMessageBlock

import styles from './chattingPage.module.css'
import {Sidebar} from "./sidebar/Sidebar.tsx";
import {ChatList} from "./chat-list/ChatList.tsx";
import {ChatWindow} from "./chat-window/ChatWindow.tsx";
import {useEffect, useRef} from "react";
import {useChat} from "../../features/chatting/useChat.ts";

const ChattingPage = () => {
    const checkNotifications = useChat(state => state.checkNotifications);
    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            if (abortControllerRef.current) abortControllerRef.current.abort();

            const abortController = new AbortController();
            abortControllerRef.current = abortController;

            await checkNotifications(abortController.signal);
        };

        const intervalId = setInterval(fetchNotifications, 6000);

        return () => {
            clearInterval(intervalId);
            if (abortControllerRef.current) abortControllerRef.current.abort();
        };
    }, []);

    return (
        <div className={styles.container}>
            <Sidebar/>
            <ChatList/>
            <ChatWindow/>
        </div>
    )
}
export default ChattingPage

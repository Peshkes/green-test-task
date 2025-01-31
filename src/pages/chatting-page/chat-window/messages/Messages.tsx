import {useChat} from "../../../../features/chatting/useChat.ts";
import OneMessage from "./OneMessage.tsx";

const Messages = () => {
    const {selectedChat, messages} = useChat();
    return (
        <div>
            {selectedChat && messages.get(selectedChat)?.map((message) => (
                <OneMessage idMessage={message.idMessage} timestamp={message.timestamp} messageData={message.messageData} status={message.status} key={message.idMessage} />
            ))}
        </div>
    )
}
export default Messages

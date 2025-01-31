import {create} from "zustand";
import {AnyMessage, ChatState} from "./chattingTypes.ts";
import {ChattingApi} from "./ChattingApi.ts";
import {Notification} from "./notificationTypes.ts";

export const useChat = create<ChatState>((set) => ({
    selectedChat: null,
    messages: new Map(),
    chats: [],

    selectChat: (chatId) => set({selectedChat: chatId}),
    createChat: async (phoneNumber: string) => {
        const contact = await ChattingApi.getContactInfo(phoneNumber.substring(1));

        if (contact) {
            set((state) => ({
                ...state,
                chats: [...state.chats, contact],
                messages: new Map(state.messages).set(contact.chatId, []),
            }));
        } else {
            alert('Контакт не найден');
        }
    },

    sendMessage: async (chatId: string, message: string) => {
        const timestamp = Date.now();
        const result = await ChattingApi.sendMessage(chatId, message);
        if (result) {
            const outgoingMessage: AnyMessage = {
                idMessage: result.idMessage,
                timestamp,
                messageData: {
                    typeMessage: "textMessage",
                    textMessageData: {
                        textMessage: message,
                    },
                },
                status: "sent",
            };


            set((state) => {
                const newMessages = new Map(state.messages);
                const chatMessages = newMessages.get(chatId) || [];
                newMessages.set(chatId, [...chatMessages, outgoingMessage]);
                return {...state, messages: newMessages};
            });
        }
    },

    checkNotifications: async (signal: AbortSignal) => {
        const notification: Notification | undefined = await ChattingApi.receiveNotification(signal);
        console.log(notification);

        if (notification) {
            switch (notification.body.typeWebhook) {
                case "incomingMessageReceived": {
                    const {chatId} = notification.body.senderData;
                    const {textMessageData} = notification.body.messageData;

                    if (textMessageData) {
                        const incomingMessage: AnyMessage = {
                            idMessage: notification.body.idMessage,
                            timestamp: new Date().getTime(),
                            messageData: {
                                typeMessage: "textMessage",
                                textMessageData: {
                                    textMessage: textMessageData.textMessage,
                                },
                            },
                        };

                        set((state) => {
                            const newMessages = new Map(state.messages);
                            const chatMessages = newMessages.get(chatId) || [];
                            newMessages.set(chatId, [...chatMessages, incomingMessage]);
                            return {...state, messages: newMessages};
                        });
                    }
                    break;
                }

                case "outgoingMessageStatus": {
                    const {chatId, idMessage, status} = notification.body;
                    set((state) => {
                        const newMessages = new Map(state.messages);
                        const chatMessages = newMessages.get(chatId) || [];
                        newMessages.set(chatId, chatMessages.map((message) => {
                            if (message.idMessage === idMessage) {
                                return {
                                    ...message,
                                    status,
                                };
                            }
                            return message;
                        }));
                        return {...state, messages: newMessages};
                    });
                    break;
                }
            }

            await ChattingApi.deleteNotification(notification.receiptId);
        }
    }
}));

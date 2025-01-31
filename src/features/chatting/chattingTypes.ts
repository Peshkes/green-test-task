import {MessageData} from "./notificationTypes.ts";

export type ChatId = {
    chatId: string;
}

export type SendMessage = {
    chatId: string;
    message: string;
}

export type ChatState = {
    selectedChat: string | null;
    chats: BusinessContact[];
    messages: Map<string, AnyMessage[]>;

    createChat: (phoneNumber: string) => Promise<void>;
    selectChat: (chatId: string) => void;

    sendMessage: (chatId: string, message: string) => Promise<void>;
    checkNotifications: (signal: AbortSignal) => Promise<void>;
}

type ProductImageUrls = {
    requested: string;
    original: string;
}

type ProductReviewStatus = {
    whatsapp: string;
}

type BusinessProduct = {
    id: string;
    imageUrls: ProductImageUrls;
    reviewStatus: ProductReviewStatus;
    availability: string;
    name: string;
    description?: string;
    price: number | null;
    isHidden: boolean;
}

export type BusinessContact = {
    avatar: string;
    name: string;
    contactName: string;
    email: string;
    category: string;
    description: string;
    products: BusinessProduct[];
    chatId: `${number}@c.us`;
    lastSeen: Date | null;
    isArchive: boolean;
    isDisappearing: boolean;
    isMute: boolean;
    messageExpiration: number;
    muteExpiration: Date | null;
    isBusiness: boolean;
}

export type IdMessage = {
    idMessage: string;
}

export type AnyMessage = {
    idMessage: string;
    timestamp: number;
    messageData: MessageData;
    status?: 'sent' | 'delivered' | 'read';
}

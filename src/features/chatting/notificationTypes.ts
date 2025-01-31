
export type WebhookType =
    | 'stateInstanceChanged'
    | 'incomingMessageReceived'
    | 'outgoingMessageStatus';

type InstanceType = 'whatsapp';

type InstanceData = {
    idInstance: number;
    wid: string;
    typeInstance: InstanceType;
};

type SenderData = {
    chatId: string;
    sender: string;
    chatName: string;
    senderName: string;
    senderContactName: string;
};

type TextMessageData = {
    textMessage: string;
};

export type MessageData = {
    typeMessage: 'textMessage';
    textMessageData: TextMessageData;
};

export type StatusUpdate = {
    status: 'sent' | 'delivered' | 'read';
};

type BaseWebhook = {
    typeWebhook: WebhookType;
    instanceData: InstanceData;
    timestamp: number;
};

type StateInstanceChangedWebhook = BaseWebhook & {
    typeWebhook: 'stateInstanceChanged';
    stateInstance: string;
};

type IncomingMessageReceivedWebhook = BaseWebhook & {
    typeWebhook: 'incomingMessageReceived';
    idMessage: string;
    senderData: SenderData;
    messageData: MessageData;
};

export type OutgoingMessageStatusWebhook = BaseWebhook & {
    typeWebhook: 'outgoingMessageStatus';
    chatId: string;
    idMessage: string;
    status: 'sent' | 'delivered' | 'read';
    sendByApi: boolean;
    messageData: MessageData;
};

type WebhookNotification =
    | StateInstanceChangedWebhook
    | IncomingMessageReceivedWebhook
    | OutgoingMessageStatusWebhook;

export type Notification = {
    receiptId: string;
    body: WebhookNotification;
}

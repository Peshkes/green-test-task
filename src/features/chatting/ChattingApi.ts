import {RequestService} from "../../shared/RequestService.ts";
import {BusinessContact, ChatId, IdMessage, SendMessage} from "./chattingTypes.ts";
import {Notification} from "./notificationTypes.ts";

export class ChattingApi {
    static async getContactInfo(phoneNumber: string) {
        try {
            const body: ChatId = {chatId: phoneNumber + "@c.us"};
            return await RequestService.sendSavedAuthRequest<ChatId, BusinessContact>('getContactInfo', 'POST', body);
        } catch (error) {
            alert(error);
        }
    }

    static async sendMessage(chatId: string, message: string) {
        try {
            const body = {chatId, message};
            return await RequestService.sendSavedAuthRequest<SendMessage, IdMessage>('sendMessage', 'POST', body);
        } catch (error) {
            alert(error);
        }
    }

    static async receiveNotification(signal: AbortSignal) {
        try {
            return await RequestService.sendSavedAuthRequest<undefined, Notification>('receiveNotification', 'GET', undefined, signal, '?receiveTimeout=5');
        } catch (error) {
            alert(error);
        }
    }

    static async deleteNotification(receiptId: string) {
        try {
            await RequestService.sendSavedAuthRequest('deleteNotification', 'DELETE', undefined, undefined, receiptId);
        } catch (error) {
            alert(error);
        }
    }
}

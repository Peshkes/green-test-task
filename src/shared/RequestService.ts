import {RequestError} from "./RequestError.ts";

export class RequestService {
    private static API_URL = "https://api.greenapi.com";
    private static SAVED_INSTANCE: string | null = null;
    private static SAVED_API_TOKEN: string | null = null;

    public static setSavedInstance = (instance: string) => RequestService.SAVED_INSTANCE = instance;
    public static setSavedApiToken = (apiToken: string) => RequestService.SAVED_API_TOKEN = apiToken;

    public static sendSavedAuthRequest = async <D, R>(
        endpoint: string,
        method: string = 'GET',
        data?: D,
        signal?: AbortSignal,
        additionalEndpoint?: string
    ): Promise<R | undefined> => {
        if (this.SAVED_INSTANCE && this.SAVED_API_TOKEN) {
            return RequestService.sendRequest<D, R>(
                this.SAVED_INSTANCE,
                this.SAVED_API_TOKEN,
                endpoint,
                method,
                data,
                signal,
                additionalEndpoint
            );
        } else
            throw new Error('Authentication credentials not set');
    }

    public static sendRequest = async <D, R>(
        instance: string,
        apiToken: string,
        endpoint: string,
        method: string = 'GET',
        data?: D,
        signal?: AbortSignal,
        additionalEndpoint?: string
    ): Promise<R | undefined> => {
        try {
            const url = `${this.API_URL}/waInstance${instance}/${endpoint}/${apiToken}${additionalEndpoint ? `/${additionalEndpoint}` : ''}`;

            const response = await fetch(url, {
                method,
                headers: {'Content-Type': 'application/json'},
                body: data ? JSON.stringify(data) : undefined,
                signal,
            });

            if (!response.ok) throw new RequestError(response.statusText, response.status);

            try {
                return await response.json() as R;
            } catch (error) {
                const message = error instanceof Error ? error.message : 'Failed to parse JSON response';
                throw new RequestError(`Response is not JSON: ${message}`, 500);
            }
        } catch (error) {
            if (error instanceof RequestError) throw error;
            else if (error instanceof DOMException && error.name === 'AbortError') console.log(error);
            else {
                const errorMessage = error instanceof Error ? error.message : 'Unknown network error';
                throw new RequestError(`Network error: ${errorMessage}`, 0);
            }
        }
    }
}



import {RequestService} from "../../shared/RequestService.ts";
import {User} from "./authTypes.ts";

export class AuthApi{
    static getAccountInfo = async (idInstance: string, apiTokenInstance: string, signal: AbortSignal) => {
        try{
            const response = await RequestService.sendRequest<undefined, User>(idInstance, apiTokenInstance, 'getWaSettings', 'GET', undefined, signal);
            if (response &&response.stateInstance === 'authorized'){
                RequestService.setSavedApiToken(apiTokenInstance);
                RequestService.setSavedInstance(idInstance);
                return response;
            } else
                alert("This account is not authorized");
        }
        catch(error){
            alert(error);
        }
    }
}

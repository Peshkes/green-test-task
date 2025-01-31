import {create} from "zustand";
import {AuthApi} from "./AuthApi.ts";
import {AuthenticationStore} from "./authTypes.ts";

const useAuth = create<AuthenticationStore>((set) => ({
    user: null,
    login: (idInstance: string, apiTokenInstance: string, signal: AbortSignal) =>
        AuthApi.getAccountInfo(idInstance, apiTokenInstance, signal)
            .then(
                (res) => {
                    console.log(res);
                    if (res) set({user: res});
                }
            ),
    logout: () => set({user: null}),
}));

export default useAuth;

export type User = {
    avatar: string,
    phone: string,
    stateInstance: string,
    deviceId: string
}

export type AuthenticationStore = {
    user: User | null
    login: (idInstance: string, apiTokenInstance: string, signal: AbortSignal) => Promise<void>
    logout: () => void
}

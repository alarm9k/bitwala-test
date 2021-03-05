declare global {
    namespace Express {
        interface Request {
            id: string
        }
    }
}

declare module 'axios' {
    export interface AxiosRequestConfig {
        id: string;
    }
}

export {}

export interface IUser {
    id: string;
    email: string;
    fio: string;
    phone: string;
    role: string;
    sex: string;
    isActivated: boolean;
}

export interface IAuthResponse {
    accessToken?: string;
    refreshToken?: string;
    user?: IUser;
    message?: string;
}

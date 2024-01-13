export interface UserState {
    user?: IUser;
}
export interface IUser {
    id: number;
}

export interface PAuth {
    email?: string;
    password?: string;
}
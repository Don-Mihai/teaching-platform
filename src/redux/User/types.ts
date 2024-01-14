export interface UserState {
    user: IUser;
    users: IUser[];
    listeners: IUser[];
}

export enum ROLES {
    ADMIN = 'ADMIN',
    TEACHER = 'TEACHER',
    STUDENT = 'STUDENT',
}
export interface IUser {
    id: number;
    email: string;
    password: string;
    role: ROLES;
    groupId: string | number;
    firstName?: string;
    lastName?: string;
    url?: string;
}

export interface PAuth {
    email?: string;
    password?: string;
}
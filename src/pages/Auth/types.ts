export interface PRegister {
    [INPUTS_KEYS.NAME]: string;
    email: string;
    password: string;
}

export enum INPUTS_KEYS {
    NAME = 'name',
    EMAIL = 'email',
    PASSWORD = 'password',
}

export enum AUTH_MODE {
    LOGIN,
    REGISTER,
}

export const initValues = { name: '', email: '', password: '' };

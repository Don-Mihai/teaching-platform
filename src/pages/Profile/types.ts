export interface IProfile {
    [PROFILE_KEYS.EMAIL]: string;
    [PROFILE_KEYS.PASSWORD]: string;
    [PROFILE_KEYS.FIRST_NAME]: string;
    [PROFILE_KEYS.LAST_NAME]: string;
    id: number;
}

export enum PROFILE_KEYS {
    EMAIL = 'email',
    PASSWORD = 'password',
    FIRST_NAME = 'firstName',
    LAST_NAME = 'lastName',
}

export interface UserProfileProps {
    id: number;
}

export const initState = { [PROFILE_KEYS.EMAIL]: '', [PROFILE_KEYS.PASSWORD]: '', [PROFILE_KEYS.FIRST_NAME]: '', [PROFILE_KEYS.LAST_NAME]: '', id: 0 };
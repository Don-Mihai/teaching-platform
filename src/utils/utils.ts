import { INPUTS_KEYS, PRegister } from '../pages/Auth/types';

export const validateName = (formValues: Partial<PRegister>) => {
    const name = formValues[INPUTS_KEYS.FIRST_NAME];

    if (!name) {
        return { [INPUTS_KEYS.FIRST_NAME]: 'The data is required!' };
    }

    if (name?.length !== undefined && (name?.length >= 25 || name?.length <= 3)) {
        return { [INPUTS_KEYS.FIRST_NAME]: 'More than 3 and less than 25' };
    }

    return {};
};

export const validateEmail = (formValues: Partial<PRegister>) => {
    const email = formValues[INPUTS_KEYS.EMAIL];

    if (!email) {
        return { [INPUTS_KEYS.EMAIL]: 'The data is required!' };
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
        return { [INPUTS_KEYS.EMAIL]: 'The email must contain @ or the adjacent index gmail.com, mail.ru, list.ru' };
    }

    return {};
};

export const validatePassword = (formValues: Partial<PRegister>) => {
    const password = formValues[INPUTS_KEYS.PASSWORD];

    if (!password) {
        return { [INPUTS_KEYS.PASSWORD]: 'The data is required!' };
    }

    // Add your custom password strength rules here
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        return { [INPUTS_KEYS.PASSWORD]: 'Password must be at least 8 characters long and contain at least one letter and one number.' };
    }

    return {};
};

export const calculateModuleNumber = (totalLessons: number | string) => {
    if (Number(totalLessons) === 0) {
        return 1;
    }

    const lessonsPerModule = 9;
    const calculatedNum = Number(totalLessons) / lessonsPerModule;

    if (Number.isInteger(calculatedNum)) {
        return calculatedNum + 1;
    }

    return Math.ceil(calculatedNum);
};

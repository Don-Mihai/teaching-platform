import { INPUTS_KEYS, PRegister } from '../pages/Auth/types';

export const validateName = (formValues: Partial<PRegister>) => {
    if (!formValues[INPUTS_KEYS.NAME]) {
        return { [INPUTS_KEYS.NAME]: 'The data is required!' };
    }

    if (formValues[INPUTS_KEYS.NAME]?.length !== undefined && (formValues[INPUTS_KEYS.NAME]?.length >= 25 || formValues[INPUTS_KEYS.NAME]?.length <= 3)) {
        return { [INPUTS_KEYS.NAME]: 'More than 3 and less than 25' };
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
        return { [INPUTS_KEYS.EMAIL]: 'Invalid email format!' };
    }

    return {};
};

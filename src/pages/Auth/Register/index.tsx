import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { INPUTS_KEYS, PRegister } from '../types';
import { useState } from 'react';

import { validateEmail, validateName, validatePassword } from '../../../utils/utils';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
interface Props {
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    formValues: Partial<PRegister>;
}

const Register = ({ onChange, formValues }: Props) => {
    const [error, setError] = useState<any>({});

    const navigate = useNavigate();

    const validate = () => {
        const errors = { ...validateName(formValues), ...validateEmail(formValues), ...validatePassword(formValues) };

        let isValid = true;

        for (const key in errors) {
            // @ts-ignore
            if (errors[key] !== undefined && errors[key].length > 0) {
                isValid = false;
            }
        }

        return [errors, isValid];
    };

    const onSignUp = async () => {
        // const [error, isValid] = validate();
        // setError(error);
        // if (isValid) {
        //     const user = (await axios.post('users', formValues)).data;
        //     localStorage.setItem('userId', user.id);
        //     navigate('/modules');
        // }

        axios.post('/hello');
    };

    const handleFocus = () => {
        setError({});
    };

    return (
        <div className="register-form">
            <h2 className="register-form__title">Register</h2>
            <div className="register-form__inputs">
                <TextField
                    onFocus={handleFocus}
                    error={error[INPUTS_KEYS.FIRST_NAME]?.length}
                    helperText={error[INPUTS_KEYS.FIRST_NAME]}
                    onChange={onChange}
                    value={formValues[INPUTS_KEYS.FIRST_NAME]}
                    label="Name"
                    name={INPUTS_KEYS.FIRST_NAME}
                    fullWidth
                ></TextField>
                <TextField
                    onFocus={handleFocus}
                    error={error[INPUTS_KEYS.EMAIL]?.length}
                    helperText={error[INPUTS_KEYS.EMAIL]}
                    onChange={onChange}
                    value={formValues.email}
                    label="Email"
                    name={INPUTS_KEYS.EMAIL}
                    fullWidth
                ></TextField>
                <TextField
                    onFocus={handleFocus}
                    error={error[INPUTS_KEYS.PASSWORD]?.length}
                    helperText={error[INPUTS_KEYS.PASSWORD]}
                    onChange={onChange}
                    value={formValues.password}
                    label="Password"
                    name={INPUTS_KEYS.PASSWORD}
                    fullWidth
                ></TextField>
                <Button onClick={onSignUp} variant="contained">
                    Sign up
                </Button>
            </div>
        </div>
    );
};

export default Register;

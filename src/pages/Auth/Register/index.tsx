import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { INPUTS_KEYS, PRegister } from '../types';

interface Props {
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    formValues: Partial<PRegister>;
}

const Register = ({ onChange, formValues }: Props) => {
    return (
        <div className="register-form">
            <h2 className="register-form__title">Register</h2>
            <div className="register-form__inputs">
                <TextField onChange={onChange} value={formValues[INPUTS_KEYS.NAME]} label="Name" name={INPUTS_KEYS.NAME} fullWidth></TextField>
                <TextField onChange={onChange} value={formValues.email} label="Email" name="email" fullWidth></TextField>
                <TextField onChange={onChange} value={formValues.password} label="Password" name="password" fullWidth></TextField>
                <Button variant="contained">Sign up</Button>
            </div>
        </div>
    );
};

export default Register;

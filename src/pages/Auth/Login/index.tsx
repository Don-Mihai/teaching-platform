import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { INPUTS_KEYS, PRegister } from '../types';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../../redux/User';
import { useDispatch } from 'react-redux';

interface Props {
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    formValues: Partial<PRegister>;
}

const Login = ({ onChange, formValues }: Props) => {
    const [open, setOpen] = useState<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSignIn = async () => {
        const user = (await axios.get(`http://localhost:3001/users?email=${formValues.email}&password=${formValues.password}`)).data[0];

        if (user?.id) {
            dispatch(setUser(user));

            navigate('/modules');
        } else {
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="register-form">
            <h2 className="register-form__title">Log in</h2>
            <div className="register-form__inputs">
                <TextField onChange={onChange} value={formValues.email} label="Email" name="email" fullWidth></TextField>
                <TextField onChange={onChange} value={formValues.password} label="Password" name="password" fullWidth></TextField>
                <Button onClick={onSignIn} variant="contained">
                    Sign in
                </Button>
            </div>
            <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Incorect email or password!
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Login;

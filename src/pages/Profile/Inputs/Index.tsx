import { Button, TextField } from '@mui/material';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { IProfile, PROFILE_KEYS, initState } from '../types';
import './Inputs.scss';

interface AddUserProps {
    addUser: (newUser: IProfile) => void;
}

const Inputs: FC<AddUserProps> = ({ addUser }) => {
    const [formValues, setFormValues] = useState<IProfile>(initState);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { email, password, firstName, lastName } = formValues;

        if (email && password && firstName && lastName) {
            addUser({ email, password, firstName, lastName, id: Date.now() });
        }
    };

    console.log('formValues >>>', formValues);

    return (
        <div className="profile-component">
            <form onSubmit={handleSubmit}>
                <div className="profile-component__input-email">
                    <TextField
                        name="email"
                        type="text"
                        value={formValues[PROFILE_KEYS.EMAIL]}
                        fullWidth
                        sx={{ border: 'none' }}
                        onChange={handleChange}
                        variant="outlined"
                        label="Email"
                    />
                </div>
                <div className="profile-component__input-password">
                    <TextField
                        name="password"
                        type="text"
                        value={formValues[PROFILE_KEYS.PASSWORD]}
                        onChange={handleChange}
                        fullWidth
                        sx={{ border: 'none' }}
                        variant="outlined"
                        label={'Password'}
                    />
                </div>
                <div className="profile-component__input-first-name">
                    <TextField
                        name="firstName"
                        type="text"
                        value={formValues[PROFILE_KEYS.FIRST_NAME]}
                        onChange={handleChange}
                        fullWidth
                        label={'First Name'}
                    ></TextField>
                </div>
                <div className="profile-component__input-last-name">
                    <TextField
                        name="lastName"
                        type="text"
                        value={formValues[PROFILE_KEYS.LAST_NAME]}
                        onChange={handleChange}
                        fullWidth
                        label={'Last Name'}
                    ></TextField>
                </div>
                <div className="profile-component__button-save">
                    <Button type="submit" size="large" sx={{ textTransform: 'none' }} fullWidth variant="contained">
                        Save changes
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Inputs;

import { Button, TextField } from '@mui/material';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { IProfile, PROFILE_KEYS, initState } from '../types';
import './Inputs.scss';

interface AddUserProps {
    formValues: Partial<IProfile>;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: any) => void;
}

const Inputs: FC<AddUserProps> = ({ formValues, handleChange, handleSubmit }) => {
    return (
        <div className="profile-component">
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
                <Button onClick={handleSubmit} size="large" sx={{ textTransform: 'none' }} fullWidth variant="contained">
                    Save changes
                </Button>
            </div>
        </div>
    );
};

export default Inputs;

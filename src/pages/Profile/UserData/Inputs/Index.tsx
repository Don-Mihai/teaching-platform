import { Button, TextField } from '@mui/material';
import { ChangeEvent, FC, FormEvent } from 'react';
import { IProfile, PROFILE_KEYS } from '../../types';
import './Inputs.scss';

interface AddUserProps {
  formValues: Partial<IProfile>;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent) => void;
}

const Inputs: FC<AddUserProps> = ({ formValues, handleChange, handleSubmit }) => {
  return (
    <>
      <div className="profile-component__input-email">
        <TextField
          name="email"
          type="text"
          value={formValues?.[PROFILE_KEYS.EMAIL]}
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
          value={formValues?.[PROFILE_KEYS.PASSWORD]}
          onChange={handleChange}
          sx={{ border: 'none' }}
          variant="outlined"
          label={'Password'}
        />
      </div>
      <div className="profile-component__input-first-name">
        <TextField name="firstName" type="text" value={formValues?.[PROFILE_KEYS.FIRST_NAME]} onChange={handleChange} label={'First Name'}></TextField>
      </div>
      <div className="profile-component__input-last-name">
        <TextField name="lastName" type="text" value={formValues?.[PROFILE_KEYS.LAST_NAME]} onChange={handleChange} label={'Last Name'}></TextField>
      </div>
      <div className="profile-component__button-save">
        <Button onClick={handleSubmit} size="large" sx={{ textTransform: 'none' }} variant="contained">
          Save changes
        </Button>
      </div>
    </>
  );
};

export default Inputs;

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { INPUTS_KEYS, PRegister } from '../types';
import { useState } from 'react';
import { validateEmail, validateName } from '../../../utils/utils';
import { useNavigate, useLocation } from 'react-router-dom';
interface Props {
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    formValues: Partial<PRegister>;
}

const Register = ({ onChange, formValues }: Props) => {

       const [error, setError] = useState<any> ({})
       const navigate = useNavigate()
   

    const validatePassword = () => {
      
    }

    const validate = () => {
        const errors = { ...validateName(formValues), ...validateEmail(formValues)}
        let isValid = true
      for (const key in errors) {

        //@ts-ignore
        if ( errors[key] !== undefined && errors[key].length > 0) {
            isValid = false
        }
      }  
        return [errors, isValid ]
    }
         
const onSignUp = () => {
   const [error , isValid]= validate()
   setError(error)
   
   if (isValid) {
    navigate ('/modules')
   }
   

  
}

const handleFocus = () => {
   
}

    return (
        <div className="register-form">
            <h2 className="register-form__title">Register</h2>
            <div className="register-form__inputs">
                <TextField  onFocus={handleFocus} error={error[INPUTS_KEYS.NAME]?.length} helperText={error[INPUTS_KEYS.NAME]} onChange={onChange} value={formValues[INPUTS_KEYS.NAME]} label="Name" name={INPUTS_KEYS.NAME} fullWidth></TextField>
                <TextField onChange={onChange}  onFocus={handleFocus} error={error[INPUTS_KEYS.EMAIL]?.length} helperText={error[INPUTS_KEYS.EMAIL]}
                value={formValues.email} label="Email" name="email" fullWidth></TextField>
                <TextField onChange={onChange} value={formValues.password} label="Password" name="password" fullWidth></TextField>
                <Button  onClick = {onSignUp} variant="contained">Sign up</Button>
            </div>
        </div>
    );
};

export default Register;

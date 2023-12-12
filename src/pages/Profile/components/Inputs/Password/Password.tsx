import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

const Password = () => {
    return (
        <div className="profile-page__input-password">
            <TextField
                fullWidth
                sx={{ border: 'none' }}
                variant="outlined"
                label={'Password'}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Button sx={{ marginTop: '3px', textTransform: 'none' }}>Change password</Button>
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
};

export default Password;

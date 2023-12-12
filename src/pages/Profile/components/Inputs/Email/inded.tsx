import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

const Email = () => {
    return (
        <div className="profile-page__input-email">
            <TextField
                fullWidth
                sx={{ border: 'none' }}
                variant="outlined"
                label="Email"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Button sx={{ marginTop: '3px', textTransform: 'none' }}>Change email</Button>
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
};

export default Email;

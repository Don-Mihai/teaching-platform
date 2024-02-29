import { useGoogleLogin } from '@react-oauth/google';
import { addToken } from '../../redux/User';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { RootState } from '../../redux/store';

const GoogleAuth = () => {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            dispatch(addToken(tokenResponse.access_token));
            localStorage.setItem('id_token', tokenResponse.access_token);
            console.log(tokenResponse);
        },
        scope: 'https://www.googleapis.com/auth/youtube.upload',
    });

    return (
        <Button onClick={() => login()} fullWidth variant="contained" color={user.token ? 'success' : 'error'}>
            Sign in with Google 🚀
        </Button>
    );
};

export default GoogleAuth;

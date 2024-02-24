import { useGoogleLogin } from '@react-oauth/google';
import { addToken } from '../../redux/User';
import { useDispatch } from 'react-redux';

const GoogleAuth = () => {
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
        <button onClick={() => login()}>Sign in with Google 🚀</button>
    );
};

export default GoogleAuth;

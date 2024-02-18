import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { addToken } from '../../redux/User';
import { useDispatch } from 'react-redux';

const GoogleAuth = () => {
    const dispatch = useDispatch();
    // const handleSuccess = async (credentialResponse: any) => {
    //     const data = credentialResponse.credential;
    //     const user = jwtDecode(data);

    //     console.log(user);

    // dispatch(addToken(token));

    // };

    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            dispatch(addToken(tokenResponse.access_token));
            console.log(tokenResponse);
        },
        scope: 'https://www.googleapis.com/auth/youtube.upload',
    });

    return (
        // <GoogleLogin
        //     onSuccess={handleSuccess}
        //     onError={() => {
        //         console.log('Login Failed');
        //     }}
        // />
        <button onClick={() => login()}>Sign in with Google 🚀</button>
    );
};

export default GoogleAuth;

import { GoogleLogin } from '@react-oauth/google';
import { addToken } from '../../redux/User';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

const GoogleAuth = () => {
    const dispatch = useDispatch();
    const handleSuccess = async (credentialResponse: any) => {
        const data = credentialResponse.credential;
        const user = jwtDecode(data);

        console.log(user);

        // dispatch(addToken(token));

        const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
            headers: {
                // Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        });

        if (response.ok) {
            const userData = await response.json();
            console.log('User Data:', userData);
            // Здесь вы получите данные пользователя, такие как имя и фамилия
        } else {
            console.log('Failed to fetch user data');
        }
    };

    return (
        <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => {
                console.log('Login Failed');
            }}
        />
    );
};

export default GoogleAuth;

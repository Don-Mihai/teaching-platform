import { GoogleLogin } from '@react-oauth/google';

const GoogleAuth = () => {
    const handleSuccess = async (credentialResponse: any) => {
        const token = credentialResponse.credential;

        const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
            headers: {
                Authorization: `Bearer ${token}`,
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

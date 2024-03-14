import { useGoogleLogin } from '@react-oauth/google';
import { addToken, fetchUser } from '../../redux/User';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import { AppDispatch, RootState } from '../../redux/store';
import { useEffect } from 'react';

const GoogleAuth = () => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUser(localStorage.getItem('id_token') || ''));
    dispatch(addToken(localStorage.getItem('id_token') || ''));
  }, []);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      dispatch(addToken(tokenResponse.access_token));
      localStorage.setItem('id_token', tokenResponse.access_token);
      dispatch(fetchUser(tokenResponse.access_token));
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

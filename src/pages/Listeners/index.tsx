import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import './Listeners.scss';
import { AppDispatch, RootState } from '../../redux/store';
import { useEffect } from 'react';
import { getListeners } from '../../redux/User';
import { Avatar, Box, FormControl, TextField } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

const Listeners = () => {
    const listeners = useSelector((store: RootState) => store.user.listeners);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        fetchListeners();
    }, []);

    const fetchListeners = async () => {
        dispatch(getListeners());
    };

    return (
        <div className="listeners-page">
            <Header />
            <div className="listeners-page__content">
                <div className="listeners-page__lists">
                    <h1 className="listeners-page__head-title">Слушатели</h1>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField fullWidth id="input-with-sx" label="Поиск" variant="standard" />
                    </Box>
                    {listeners.map(item => {
                        return (
                            <div className="listeners-page__list">
                                <Avatar src="" sx={{ width: '50px', height: '50px', marginRight: '10px' }} />
                                <h2 className="listeners-page__title">{item.firstName}</h2>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Listeners;

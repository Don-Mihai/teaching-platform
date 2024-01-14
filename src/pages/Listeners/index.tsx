import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import './Listeners.scss';
import { AppDispatch, RootState } from '../../redux/store';
import { useEffect } from 'react';
import { getListeners } from '../../redux/User';

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
                <h1>Your Listeners</h1>
                {listeners.map(item => {
                    return <div>{item.firstName}</div>;
                })}
            </div>
        </div>
    );
};

export default Listeners;

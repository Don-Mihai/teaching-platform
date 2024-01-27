import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import './Listeners.scss';
import { AppDispatch, RootState } from '../../redux/store';
import { useEffect, useState } from 'react';
import { getListeners } from '../../redux/User';
import TableSortLabel from '@mui/material/TableSortLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MenuItem } from '@mui/material';


const Listeners = () => {
    const listeners = useSelector((store: RootState) => store.user.listeners);
    const dispatch = useDispatch<AppDispatch>();

    const [item, setItem] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
      setItem(event.target.value);
    };

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
                <div>Your Listeners</div>

                <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={item}
          onChange={handleChange}
          label="Sort"
        >
            
{listeners.map(item => {
                    return <MenuItem value={item.firstName}>{item.firstName}</MenuItem>;
                })}
        </Select>
                
            </div>
        </div>
    );
};

export default Listeners;

import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import './Listeners.scss';
import { AppDispatch, RootState } from '../../redux/store';
import { useEffect, useState } from 'react';
import { getListeners } from '../../redux/User';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import { Avatar, Box, TextField } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

const Listeners = () => {
  const listeners = useSelector((store: RootState) => store.user.listeners);
  const dispatch = useDispatch<AppDispatch>();

  const [item, setItem] = useState('1');
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetchListeners();
  }, []);

  const fetchListeners = async () => {
    dispatch(getListeners());
  };

  const handleChange = (event: SelectChangeEvent) => {
    setItem(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const filteredListeners = listeners
    .filter((item) => {
      const fullName = `${item.firstName} ${item.lastName || ''}`.toLowerCase();
      return fullName.includes(searchValue.toLowerCase());
    })
    .sort((a, b) => {
      if (a.firstName === b.firstName) {
        return (a.lastName || '').localeCompare(b.lastName || '');
      }
      return (a.firstName || '').localeCompare(b.firstName || '');
    });

  return (
    <div className="listeners-page">
      <Header />
      <div className="listeners-page__content">
        <div className="listeners-page__lists">
          <h1 className="listeners-page__head-title">Слушатели</h1>
          <div>
            <Select
              sx={{ width: '200px' }}
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={item}
              onChange={handleChange}
              label="Sort"
            >
              <MenuItem value={1}>По алфавиту</MenuItem>
              <MenuItem value={2}>По времени добавления</MenuItem>
              <MenuItem value={3}>По уровню</MenuItem>
            </Select>
          </div>

          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField fullWidth id="input-with-sx" label="Поиск" variant="standard" value={searchValue} onChange={handleSearchChange} />
          </Box>
          {filteredListeners.map((item) => {
            return (
              <div className="listeners-page__list">
                <Avatar src={item.url} className="listeners-page__avatar">
                  {`${item.firstName?.charAt(0) || ''}${item.lastName?.charAt(0) || ''}`}
                </Avatar>
                <h2 className="listeners-page__title">
                  {item.firstName} {item.lastName}
                </h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Listeners;

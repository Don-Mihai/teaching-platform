import './Profile.scss';
import Header from '../../components/Header';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import UserData from './UserData';
import Tasks from './UserData/Tasks';
import ItemStatistic from './ItemStatistic';
import MessageIcon from '@mui/icons-material/Message';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import Chat from '../../components/Chat';

const Profile = () => {
  const user = useSelector((store: RootState) => store.user.user);
  const visits = 6;
  const numberOfVisits = 10;
  const quant = '4';
  const maxQuant = '54';
  const date = '01.01.2025';
  const tasks = 'Задания';
  const todo = '12';
  const inProgress = '1';
  const complete = '3';

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="profile-page">
      <Header />
      <div className="profile-page__content">
        <UserData user={user} />
        <div className="profile-page__container-modules">
          <ItemStatistic title={'Предполагаемая дата окончания курса'} children={date} />
          <ItemStatistic title={'Статистика занятий'} children={`Уроков ${quant} из ${maxQuant}`} />
        </div>
        <Tasks title={tasks}>
          <span className="profile-page__todo">{todo}</span>/<span className="profile-page__inProgress">{inProgress}</span>/
          <span className="profile-page__complete">{complete}</span>
        </Tasks>
        <ItemStatistic title={'Очные посещения'} children={`${visits}, ${(visits / numberOfVisits) * 100}%`} />
        <ItemStatistic title="CodeWars">
          <img src="https://www.codewars.com/users/SashaSavelev/badges/large" alt="" />
        </ItemStatistic>
        <IconButton onClick={handleClickOpen} color="primary">
          <MessageIcon />
        </IconButton>
        <Chat open={open} handleClose={handleClose} />
      </div>
    </div>
  );
};

export default Profile;

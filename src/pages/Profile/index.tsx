import './Profile.scss';
import Header from '../../components/Header';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import UserData from './UserData';
import ItemStatistic from './ItemStatistic';

const Profile = () => {
    const user = useSelector((store: RootState) => store.user.user);

    const quant = '4';
    const maxQuant = '54';
    const date = '01.01.2025';
    return (
        <div className="profile-page">
            <Header />
            <div className="profile-page__content">
                <UserData user={user} />
                <div className="profile-page__container-modules">
                    <ItemStatistic title={'Предполагаемая дата окончания курса'} children={date} />
                    <ItemStatistic title={'Статистика занятий'} children={`Уроков ${quant} из ${maxQuant}`} />
                </div>
            </div>
        </div>
    );
};

export default Profile;

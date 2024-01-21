import './Profile.scss';
import Header from '../../components/Header';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import UserData from './UserData';
import ItemStatistic from './ItemStatistic';

const Profile = () => {
    const user = useSelector((store: RootState) => store.user.user);

    return (
        <div className="profile-page">
            <Header />
            <div className="profile-page__content">
                <UserData user={user} />
                <div className="profile-page__container-modules">
                    <ItemStatistic title={'Предполагаемая дата окончания курса'} />
                    <ItemStatistic title={'Статистика занятий'} />
                </div>
            </div>
        </div>
    );
};

export default Profile;

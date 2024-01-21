import './Profile.scss';
import Header from '../../components/Header';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import UserData from './UserData';
import FtfStatistic from '../../components/Statistics';

const Profile = () => {
	const user = useSelector((store: RootState) => store.user.user);
    const visits = 6
    const numberOfVisits = 10
    const type = 'Очные посещения'

    return (
        <div className="profile-page">
            <Header />
            <div className="profile-page__content">
                <UserData user={user} />
                <FtfStatistic type={type}>{visits}, {visits/numberOfVisits*100}%</FtfStatistic>
            </div>
        </div>
    );
};

export default Profile;

import './Profile.scss';
import Header from '../../components/Header';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import UserData from './UserData';
import LessonsStat from './LessonsStat';
import ExpirationDate from './ExpirationDate';

const Profile = () => {
    const user = useSelector((store: RootState) => store.user.user);

    return (
        <div className="profile-page">
            <Header />
            <div className="profile-page__content">
                <UserData user={user} />
                <div className="profile-page__container-modules">
                    <ExpirationDate />
                    <LessonsStat />
                </div>
            </div>
        </div>
    );
};

export default Profile;

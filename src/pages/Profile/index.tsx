import './Profile.scss';
import Header from '../../components/Header';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import UserData from './UserData';
import Tasks from './UserData/Tasks';

const Profile = () => {
    const user = useSelector((store: RootState) => store.user.user);

    const tasks = 'Задания'
    const todo = '12'
    const inProgress = '1'
    const complete = '3'

    return (
        <div className="profile-page">
            <Header />
            <div className="profile-page__content">
                <UserData user={user} />
                <div className='tasks'>
                    <Tasks title={tasks} children={`${todo}/${inProgress}/${complete}`} />
                </div>
            </div>

        </div >
    );
};

export default Profile;

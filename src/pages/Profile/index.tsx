import Header from '../../components/Header';
import './Profile.scss';
import Button from '@mui/material/Button';
import { pink } from '@mui/material/colors';
import Inputs from './Inputs/Index';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { IProfile, PROFILE_KEYS, initState } from './types';
import axios from 'axios';

import { Avatar } from '@mui/material';
import FileDrop from '../../components/FileDrop';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Profile = () => {
    const [formValues, setFormValues] = useState<Partial<IProfile>>(initState);
    const lessons = useSelector((store: RootState) => store.lesson.lessons);
	const user = useSelector((store: RootState) => store.user.user);

    useEffect(() => {
        fetchUser();
    }, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (event: FormEvent) => {
        await axios.put(`http://localhost:3001/users/${formValues.id}`, formValues);
    };

    const fetchUser = async () => {
        setFormValues(user);
    };

    return (
        <div className="profile-page">
            <Header />
            <div className="profile-page__content">
                <div className="profile-page__sub-cont">
                    <div className="profile-page__title-cont">
                        <h3 className="profile-page__title-text">Settings profile</h3>
                    </div>
                    <div className="profile-page__main-cont">
                        <div className="profile-page__avatar">
                            <FileDrop onSendFiles={() => {}}>
                                <Avatar src={`${formValues?.[PROFILE_KEYS.URL]}`} sx={{ bgcolor: pink[300], width: 100, height: 100, margin: '20px' }}>
                                    {`${formValues?.[PROFILE_KEYS.FIRST_NAME]?.charAt(0) || ''}${formValues?.[PROFILE_KEYS.LAST_NAME]?.charAt(0) || ''}`}
                                </Avatar>
                            </FileDrop>
                        </div>
                        <Inputs handleChange={handleChange} handleSubmit={handleSubmit} formValues={formValues} />
                    </div>
                </div>
                sdf
                {lessons.map(item => item.title)}
            </div>
        </div>
    );
};

export default Profile;

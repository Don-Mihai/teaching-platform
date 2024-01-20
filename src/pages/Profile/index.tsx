import Header from '../../components/Header';
import './Profile.scss';
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
	const user = useSelector((store: RootState) => store.user.user);

    useEffect(() => {
        fetchUser();
    }, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (event: FormEvent) => {
        await axios.put(`users/${formValues.id}`, formValues);
    };

    const fetchUser = async () => {
        setFormValues(user);
    };

    return (
        <div className="profile-page">
            <Header />
            <div className="profile-page__content">
                <div className="profile-page__user-data">
                    <div className="profile-page__left">
                        <div className="profile-page__avatar-container">
                            <FileDrop onSendFiles={() => {}}>
                                <Avatar className="profile-page__avatar" src={formValues?.[PROFILE_KEYS.URL]}>
                                    {`${formValues?.[PROFILE_KEYS.FIRST_NAME]?.charAt(0) || ''}${formValues?.[PROFILE_KEYS.LAST_NAME]?.charAt(0) || ''}`}
                                </Avatar>
                            </FileDrop>
                            <h3 className="page-profile__avatar-title">{user.firstName}</h3>
                        </div>
                    </div>
                    <div className="profile-page__right"></div>
                </div>

                <Inputs handleChange={handleChange} handleSubmit={handleSubmit} formValues={formValues} />
            </div>
        </div>
    );
};

export default Profile;

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

const Profile = () => {
    const [formValues, setFormValues] = useState<Partial<IProfile>>(initState);

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
        const user = (await axios.get(`http://localhost:3001/users/${localStorage.getItem('userId')}`)).data;
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
<<<<<<< HEAD
                            <FileDrop onSendFiles={() => { }}>
                                <Avatar src={`${formValues?.[PROFILE_KEYS.URL]}`} sx={{ bgcolor: pink[300], width: 100, height: 100, margin: '20px' }}>
                                    {`${formValues?.[PROFILE_KEYS.FIRST_NAME]?.charAt(0) || ''}${formValues?.[PROFILE_KEYS.LAST_NAME]?.charAt(0) || ''}`}
                                </Avatar>
                            </FileDrop>
=======
                            <FileDrop onSendFiles={() => {}}>
                                <Avatar sx={{ bgcolor: pink[300], width: 100, height: 100, margin: '20px' }}>
                                    {`${formValues?.[PROFILE_KEYS.FIRST_NAME]?.charAt(0) || ''}${formValues?.[PROFILE_KEYS.LAST_NAME]?.charAt(0) || ''}`}
                                </Avatar>
                            </FileDrop>

>>>>>>> b86afed7297cd1de8d65dc1fe3941eaf51fd0be5
                            <span className="profile-page__avatar-label">JPG or PNG, min 100 x 100 pixel, to 5 Mb </span>
                            <label className="profile-page__label-file-drop" htmlFor="contained-button-file">
                                Drag your photo or
                                <FileDrop onSendFiles={() => {}}>
                                    <Button sx={{ boxShadow: 'none', textTransform: 'none' }} component="span">
                                        upload a new image
                                    </Button>
                                </FileDrop>
                            </label>
                        </div>
                        <Inputs handleChange={handleChange} handleSubmit={handleSubmit} formValues={formValues} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

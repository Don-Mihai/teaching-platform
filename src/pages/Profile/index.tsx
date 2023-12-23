import Header from '../../components/Header';
import './Profile.scss';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { grey, pink } from '@mui/material/colors';
import styled from '@emotion/styled';
import Inputs from './Inputs/Index';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { IProfile, initState } from './types';
import axios from 'axios';

const Profile = () => {
    const [formValues, setFormValues] = useState<Partial<IProfile>>(initState);

    useEffect(() => {
        fetchUser();
    }, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (event: any) => {
        //Сделать функцию которая использует patch или put чтобы она 
        //перезаписала и дополнила данные в БД
        
    };
    

    const fetchUser = async () => {
        const user = (await axios.get(`http://localhost:3001/users/${localStorage.getItem('userId')}`)).data;
        setFormValues(user);
    };

    return (
        <div className="profile-page">
            <Header />
            <div className="profile-page__content">
                <div className="profile-page__title-cont">
                    <h3 className="profile-page__title-text">Settings profile</h3>
                </div>
                <div className="profile-page__main-cont">
                    <div className="profile-page__avatar">
                        <Avatar sx={{ bgcolor: pink[300], width: 80, height: 80, margin: '20px' }}>MP</Avatar>
                        <span className="profile-page__avatar-label">JPG or PNG, min 100 x 100 pixel, to 5 Mb </span>
                        <span className="profile-page__avatar-label-new">
                            Drag your photo or
                            <label htmlFor="contained-button-file">
                                <Button sx={{ boxShadow: 'none', textTransform: 'none' }} component="span">
                                    upload a new image
                                </Button>
                            </label>
                        </span>
                    </div>
                    <Inputs handleChange={handleChange} handleSubmit={handleSubmit} formValues={formValues} />
                </div>
            </div>
        </div>
    );
};

export default Profile;

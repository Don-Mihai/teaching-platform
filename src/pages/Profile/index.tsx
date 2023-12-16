import Header from '../../Components/Header';
import './Profile.scss';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { grey, pink } from '@mui/material/colors';
import ClearIcon from '@mui/icons-material/Clear';
import styled from '@emotion/styled';
import axios from 'axios';
import Inputs from './components/Inputs/Index';
import { useState } from 'react';
import { IProfile } from './types';

const Input = styled('input')({
    display: 'none',
});

const Profile = () => {
    const [usersList, setUsersList] = useState<IProfile[]>([]);

    const addUser = (newUser: IProfile) => {
        setUsersList([...usersList, newUser]);
    };

    console.log('usersList >>>', usersList);

    return (
        <div className="profile-page">
            <Header />
            <div className="profile-page__content">
                <div className="profile-page__title-cont">
                    <h3 className="profile-page__title-text">Settings profile</h3>
                    <Button sx={{ color: grey[500] }}>
                        <ClearIcon />
                    </Button>
                </div>
                <div className="profile-page__main-cont">
                    <div className="profile-page__avatar">
                        <Avatar sx={{ bgcolor: pink[300], width: 80, height: 80, margin: '20px' }}>MP</Avatar>
                        <span className="profile-page__avatar-label">JPG or PNG, min 100 x 100 pixel, to 5 Mb </span>
                        <span className="profile-page__avatar-label-new">
                            Drag your photo or
                            <label htmlFor="contained-button-file">
                                <Input accept="image/*" id="contained-button-file" multiple type="file" />
                                <Button sx={{ boxShadow: 'none', textTransform: 'none' }} component="span">
                                    upload a new image
                                </Button>
                            </label>
                        </span>
                    </div>
                    <Inputs addUser={addUser} />
                </div>
            </div>
        </div>
    );
};

export default Profile;

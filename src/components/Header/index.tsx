import Button from '@mui/material/Button';
import './Header.scss';
import { Link, useLocation } from 'react-router-dom';
import { PAGE_ROUTES } from '../../utils/types';
import { Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { memo, useState } from 'react';
import axios from 'axios';
import BookIcon from '@mui/icons-material/Book';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { ROLES } from '../../redux/User/types';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { createLesson } from '../../redux/Lesson';

const Header = memo(() => {
    const user = useSelector((store: RootState) => store.user.user);
    const [isFold, setIsFold] = useState<boolean>(true);
    const [isClose, setIsClose] = useState<boolean>(false)
    const navigate = useLocation();
    const dispatch = useDispatch<AppDispatch>();


    const onFold = () => {
        setIsFold(false);
    };

    const closeHeader = () => {
        setIsFold(true)
    }

    const createLes = async () => {
        dispatch(createLesson(user))
    };

    const joinLesson = () => { };

    return (
        <header onMouseEnter={onFold} className={`header-component ${isFold ? '' : 'header-component--active'}`}>
            <Button
                fullWidth
                className='arrowBackIcon'
                onClick={closeHeader}
                startIcon={<ArrowBackIcon />}
            >
            </Button>

            <Link className="avatar" to={PAGE_ROUTES.Profile}>
                <Avatar sx={{ width: 70, height: 70, margin: '20px', bgcolor: 'darkkhaki' }}>MP</Avatar>
            </Link>

            <nav className="nav">
                <Link to={PAGE_ROUTES.Modules}>
                    <Button
                        fullWidth
                        variant={navigate.pathname === PAGE_ROUTES.Modules ? 'contained' : undefined}
                        color={navigate.pathname === PAGE_ROUTES.Modules ? 'success' : undefined}
                        startIcon={<ViewModuleIcon />}
                    >
                        {!isFold && 'Модули'}
                    </Button>
                </Link>

                <Link to={PAGE_ROUTES.Listeners}>
                    <Button
                        fullWidth
                        variant={navigate.pathname === PAGE_ROUTES.Listeners ? 'contained' : undefined}
                        color={navigate.pathname === PAGE_ROUTES.Listeners ? 'success' : undefined}
                        startIcon={<PeopleIcon />}
                    >
                        {!isFold && 'Слушатели'}
                    </Button>
                </Link>

                <Link to={PAGE_ROUTES.Tasks}>
                    <Button
                        fullWidth
                        variant={navigate.pathname === PAGE_ROUTES.Tasks ? 'contained' : undefined}
                        color={navigate.pathname === PAGE_ROUTES.Tasks ? 'success' : undefined}
                        startIcon={<FormatListBulletedIcon />}
                    >
                        {!isFold && 'Задания'}
                    </Button>
                </Link>

                <Link to={PAGE_ROUTES.Profile}>
                    <Button
                        fullWidth
                        variant={navigate.pathname === PAGE_ROUTES.Profile ? 'contained' : undefined}
                        color={navigate.pathname === PAGE_ROUTES.Profile ? 'success' : undefined}
                        startIcon={<PersonIcon />}
                    >
                        {!isFold && 'Профиль'}
                    </Button>
                </Link>
                <Link to={PAGE_ROUTES.Lessons}>
                    <Button
                        fullWidth
                        variant={navigate.pathname === PAGE_ROUTES.Lessons ? 'contained' : undefined}
                        color={navigate.pathname === PAGE_ROUTES.Lessons ? 'success' : undefined}
                        startIcon={<BookIcon />}
                    >
                        {!isFold && 'Уроки'}
                    </Button>
                </Link>
                {/* <a href="https://jazz.sber.ru/wd7a9d?psw=OBgRDB8LDgVeCBYaQB8ZFlECCw" target='_blank'> */}
                {user.role === ROLES.STUDENT ? (
                    <Button fullWidth variant="contained" onClick={joinLesson} className="header-component__button" startIcon={<Diversity3Icon />}>
                        {!isFold && 'Присодениться к уроку'}
                    </Button>
                ) : (
                    <Button fullWidth variant="contained" onClick={createLes} className="header-component__button" startIcon={<AddIcon />}>
                        {!isFold && 'Запустить урок'}
                    </Button>
                )}
            </nav>
        </header >
    );
});

export default Header;

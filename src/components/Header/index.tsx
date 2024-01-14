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
import { format } from 'date-fns';
import { calculateModuleNumber } from '../../utils/utils';
import BookIcon from '@mui/icons-material/Book';

const Header = memo(() => {
    const [isFold, setIsFold] = useState<boolean>(true);
    const navigate = useLocation();
    // todo: при клике на стрелку скрывать и показывать
    // скролл
    // уменьшить аватарку при сужении
    // текст

    const onFold = () => {
        setIsFold(false);
    };

    const createLesson = async () => {
        const currentDate = format(new Date(), 'dd-MM-yyyy HH:mm');

        const lessons = (await axios.get('lessons')).data;

        const payload = {
            userId: localStorage.getItem('userId'),
            createDate: currentDate,
            title: currentDate,
            moduleId: calculateModuleNumber(lessons.length),
        };

        axios.post('lessons', payload);
    };

    return (
        <header onMouseEnter={onFold} className={`header-component ${isFold ? '' : 'header-component--active'}`}>
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
                <Button fullWidth variant="contained" onClick={createLesson} className="header-component__button" startIcon={<AddIcon />}>
                    {!isFold && 'Запустить урок'}
                </Button>
                {/* </a> */}
            </nav>
        </header>
    );
});

export default Header;

import Button from '@mui/material/Button';
import './Header.scss';
import { Link, useLocation } from 'react-router-dom';
import { PAGE_ROUTES } from '../../utils/types';
import { Avatar } from '@mui/material';

const Header = () => {
    const navigate = useLocation();

    return (
        <header className="header-component">
            <Link className="avatar" to={PAGE_ROUTES.Profile}>
                <Avatar sx={{ width: 70, height: 70, margin: '20px', bgcolor: 'darkkhaki' }}>MP</Avatar>
            </Link>

            <nav className="nav">
                <Link to={PAGE_ROUTES.Modules}>
                    <Button
                        fullWidth
                        size="large"
                        variant={navigate.pathname === PAGE_ROUTES.Modules ? 'contained' : undefined}
                        color={navigate.pathname === PAGE_ROUTES.Modules ? 'success' : undefined}
                    >
                        <img className="icon" width="25" height="25" src="https://img.icons8.com/ios/50/FFFFFF/module.png" alt="module" />

                        <span className="text">⠀Модули</span>
                    </Button>
                </Link>

                <Link to={PAGE_ROUTES.Listeners}>
                    <Button
                        fullWidth
                        size="large"
                        variant={navigate.pathname === PAGE_ROUTES.Listeners ? 'contained' : undefined}
                        color={navigate.pathname === PAGE_ROUTES.Listeners ? 'success' : undefined}
                    >
                        <img className="icon" width="25" height="25" src="https://img.icons8.com/ios/50/FFFFFF/queue.png" alt="listeners" />
                        <span className="text">⠀Слушатели</span>
                    </Button>
                </Link>

                <Link to={PAGE_ROUTES.Tasks}>
                    <Button
                        fullWidth
                        size="large"
                        variant={navigate.pathname === PAGE_ROUTES.Tasks ? 'contained' : undefined}
                        color={navigate.pathname === PAGE_ROUTES.Tasks ? 'success' : undefined}
                    >
                        <img className="icon" width="25" height="25" src="https://img.icons8.com/ios-filled/50/FFFFFF/todo-list.png" alt="todo-list" />
                        <span className="text">⠀Задания</span>
                    </Button>
                </Link>

                <Link to={PAGE_ROUTES.Profile}>
                    <Button
                        fullWidth
                        size="large"
                        variant={navigate.pathname === PAGE_ROUTES.Profile ? 'contained' : undefined}
                        color={navigate.pathname === PAGE_ROUTES.Profile ? 'success' : undefined}
                    >
                        <img className="icon" width="25" height="25" src="https://img.icons8.com/ios/50/FFFFFF/guest-male.png" alt="profile" />
                        <span className="text">⠀Профиль</span>
                    </Button>
                </Link>
            </nav>
        </header>
    );
};

export default Header;

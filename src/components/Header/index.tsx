import Button from '@mui/material/Button';
import './Header.scss';
import { Link, useLocation } from 'react-router-dom';
import { PAGE_ROUTES } from '../../utils/types';

const Header = () => {
    const navigate = useLocation();

    return (
        <header className="header-component">
            <nav className="nav">
                <Link to={PAGE_ROUTES.Modules}>
                    <Button fullWidth variant="contained" color={navigate.pathname === PAGE_ROUTES.Modules ? 'success' : undefined}>
                        Модули
                    </Button>
                </Link>

                <Link to={PAGE_ROUTES.Listeners}>
                    <Button fullWidth variant="contained" color={navigate.pathname === PAGE_ROUTES.Listeners ? 'success' : undefined}>
                        Слушатели
                    </Button>
                </Link>

                <Link to={PAGE_ROUTES.Tasks}>
                    <Button fullWidth variant="contained" color={navigate.pathname === PAGE_ROUTES.Tasks ? 'success' : undefined}>
                        Задания
                    </Button>
                </Link>
            </nav>
        </header>
    );
};

export default Header;

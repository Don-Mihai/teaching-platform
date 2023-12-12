import Button from '@mui/material/Button';
import './ModulesPage.scss';
import Header from '../../components/Header';
import { InputAdornment, TextField } from '@mui/material';

const ModulesPage = () => {
    return (
        <div className="modules-page">
            <Header />
            <div className="modules-page__content">
                <div className="modules-page__modules">
                    <div className="modules-page__module">1</div>
                    <div className="modules-page__module">2</div>
                    <div className="modules-page__module">3</div>
                    <div className="modules-page__module">4</div>
                    <div className="modules-page__module">5</div>
                    <div className="modules-page__module">6</div>
                </div>
            </div>
        </div>
    );
};

export default ModulesPage;

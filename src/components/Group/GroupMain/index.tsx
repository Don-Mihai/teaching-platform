import Button from '@mui/material/Button';
import { IGroup } from '../../../redux/Group/types';
import FileDrop from '../../FileDrop';
import { TextField, Snackbar, Menu, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { AppDispatch } from '../../../redux/store';
import { uploadVideo } from '../../../redux/Group';
import './GroupMain.scss';

interface Props {
    group: IGroup;
    onFlip: () => void;
    isShowed: boolean;
}

const GroupMain = ({ group, isShowed, onFlip }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [pinCode, setPinCode] = useState('Видео пока еще не загружено');
    const [formValues, setFormValues] = useState({ title: '', url: '' });
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openn = Boolean(anchorEl);

    const upload = async (video: Blob) => {
        const url = await dispatch(uploadVideo({ video, token: localStorage.getItem('id_token') || '', title: formValues.title })).unwrap();
        setPinCode('https://www.youtube.com/embed/' + url);
    };

    const onChange = (e: any) => {
        setFormValues({ ...formValues, title: e.target.value });
    };

    const copyPinCode = () => {
        setSnackbarOpen(true);
        navigator.clipboard.writeText(pinCode);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={'group-main'}>
            <div className="group__title">{group.name}</div>
            <Button href={group.url.sber} target="_blank" rel="noreferrer" variant="contained" color="primary">
                Запустить сбер джаз
            </Button>
            <Button
                href="http://study.inordic.ru/panel/users_lesson_visits?group=262"
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                color="secondary"
            >
                Открыть уроки
            </Button>

            <button onClick={onFlip}>Редактировать</button>

            <TextField onChange={onChange} value={formValues.title} name="title" placeholder="Введите название видео" fullWidth variant="outlined" />

            {Boolean(formValues.title.length) && (
                <>
                    <FileDrop onSendFiles={upload} borderRadius={'6px'} fullWidth>
                        <Button variant="outlined" sx={{ height: '80px' }} fullWidth>
                            Перетащи сюда видео
                        </Button>
                    </FileDrop>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                        <span style={{ marginRight: '8px' }}>{pinCode}</span>
                        <img src="./IconCarblack.webp" alt="IconCarblack" onClick={copyPinCode} style={{ cursor: 'pointer' }} />
                    </div>
                </>
            )}

            <Snackbar open={snackbarOpen} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={2000} onClose={handleCloseSnackbar}>
                <div style={{ background: '#fff', padding: '8px 16px', borderRadius: '4px' }}>Url скопирован!</div>
            </Snackbar>
            <div>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openn}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleClose}>Редактировать</MenuItem>
                </Menu>
            </div>
        </div>
    );
};

export default GroupMain;

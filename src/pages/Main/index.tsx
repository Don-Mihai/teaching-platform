import Button from '@mui/material/Button';
import FileDrop from '../../components/FileDrop';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { uploadVideo } from '../../redux/Lesson';
import GoogleAuth from '../../components/GoogleAuth';
import { Snackbar, TextField } from '@mui/material';
import { useState } from 'react';

const Main = () => {
    const dispatch = useDispatch<AppDispatch>();
    const groups: any[] = [
        {
            title: 'ВТ/ЧТ',
            url: 'https://jazz.sber.ru/zthtbf?psw=OBEDV0APXRVZAQRBHxtKBlYLGQ',
        },
    ];
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [pinCode, setPinCode] = useState('Видео пока еще не загружено');
    const [formValues, setFormValues] = useState({ title: '', url: '' });

    const upload = async (video: Blob) => {
        const url = await dispatch(uploadVideo({ video, token: localStorage.getItem('id_token') || '', lessonId: 0, title: formValues.title })).unwrap();
        setPinCode(url);
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
    return (
        <>
            <GoogleAuth />
            {groups.map(group => {
                return (
                    <>
                        <div>
                            <a href={group.url} target="_blank" rel="noreferrer">
                                Запустить сбер джаз
                            </a>
                            <a href="http://study.inordic.ru/panel/users_lesson_visits?group=262" target="_blank" rel="noopener noreferrer">
                                открыть уроки
                            </a>
                        </div>

                        <FileDrop onSendFiles={upload} borderRadius={'6px'}>
                            <Button variant="outlined" sx={{ height: '80px' }}>
                                Перетащи сюда видео
                            </Button>
                        </FileDrop>
                        <TextField onChange={onChange} value={formValues.title} name="title" placeholder="Введите название видео" />
                        <div>
                            <span>{pinCode}</span>
                            <img src="./IconCarblack.webp" alt="IconCarblack" onClick={copyPinCode} />
                        </div>
                        <Snackbar
                            open={snackbarOpen}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                            autoHideDuration={2000}
                            onClose={handleCloseSnackbar}
                        >
                            <div className="pin__cont">Url скопирован!</div>
                        </Snackbar>
                    </>
                );
            })}
        </>
    );
};

export default Main;

import { Button, Dialog, IconButton, Menu, MenuItem, TextField } from '@mui/material';
import './Lesson.scss';
import FileDrop from '../../../components/FileDrop';
import { useDispatch, useSelector } from 'react-redux';
import { editLesson, getLessons, removeLesson, uploadVideo } from '../../../redux/Lesson';
import { AppDispatch, RootState } from '../../../redux/store';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useEffect, useState } from 'react';
import { getById } from '../../../redux/User';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { ILesson } from '../../../redux/Lesson/types';

interface Props {
    onCloseModal: () => void;
    id: number;
    title: string;
    token?: string;
}

const Lesson = ({ id, onCloseModal, title, token }: Props) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const lessons = useSelector((store: RootState) => store.lesson.lessons);
    const videoUrl = lessons.find(item => item.id === id)?.urlVideo || '';
    const [isEditMode, setIsEditMode] = useState(false);
    const [formValues, setFormValues] = useState<ILesson | null>(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch<AppDispatch>();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        dispatch(getById());
    }, []);

    const handleRemoveLesson = async (lessongId: number) => {
        await dispatch(removeLesson(lessongId));
        dispatch(getLessons());
    };

    const upload = (video: Blob) => {
        dispatch(uploadVideo({ video, token: token || '', lessonId: id }));
    };

    const editPost = () => {
        setIsEditMode(true);
    };

    const onChange = (event: any) => {
        const key = event.target.name;
        const value = event.target.value;
        if (formValues !== null) {
            setFormValues({ ...formValues, [key]: value });
        }
    };

    const saveChanges = async () => {
        if (formValues !== null) {
            dispatch(editLesson({ lesson: formValues }));
            setIsEditMode(false);
        }
    };  

    const cancelChanges = () => {
        setFormValues(null);
        setIsEditMode(false);
    };

    return (
        <Dialog fullWidth open={Boolean(id)} onClose={onCloseModal}>
            <div className="modal-item">
                {!isEditMode ? <div className="modal-item__lesson">Урок {id}</div> : <TextField name="title" onChange={onChange} value={formValues?.title} />}

                <iframe
                    className="video"
                    src={`https://www.youtube.com/embed/${videoUrl}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
                {isEditMode ? (
                    <>
                        <IconButton color="success" className="actions__icon-btn btn" onClick={saveChanges}>
                            <CheckIcon />
                        </IconButton>
                        <IconButton color="error" className="actions__icon-btn btn" onClick={cancelChanges}>
                            <ClearIcon />
                        </IconButton>
                    </>
                ) : (
                    <>
                        <IconButton className="actions__icon-btn btn" onClick={handleClick}>
                            <MoreHorizIcon />
                        </IconButton>
                    </>
                )}
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={editPost}>Редактировать</MenuItem>
                </Menu>
                {!isEditMode ? <div className="modal-item__title"> Название: {title}</div> : <TextField name="title" onChange={onChange} value={formValues?.title} />}
                <div className="modal-item__video">
                    <FileDrop borderRadius={'0'} onSendFiles={upload}>
                        <Button className="modal-item__video-btn" fullWidth>
                            Загрузить видео
                        </Button>
                    </FileDrop>
                </div>
            </div>
            <button onClick={() => handleRemoveLesson(id)}>
                <RemoveCircleOutlineIcon />
            </button>
        </Dialog>
    );
};

export default Lesson;

import { Button, Dialog, IconButton, Menu, MenuItem, TextField } from '@mui/material';
import './Lesson.scss';
import FileDrop from '../../../components/FileDrop';
import { useDispatch, useSelector } from 'react-redux';
import { getLessons, removeLesson, uploadVideo } from '../../../redux/Lesson';
import { AppDispatch, RootState } from '../../../redux/store';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useEffect, useState } from 'react';
import { getById } from '../../../redux/User';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import { ILesson } from '..';

interface Props {
    onCloseModal: () => void;
    id: number;
    title: string;
    token?: string;
}

const Lesson = ({ id, onCloseModal, title, token }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const open = Boolean(anchorEl);
    const lessons = useSelector((store: RootState) => store.lesson.lessons);
    const videoUrl = lessons.find(item => item.id === id)?.urlVideo || '';
    const [formValues, setFormValues] = useState({title});

    useEffect(() => {
        dispatch(getById());
    }, []);

    useEffect(() => {
        setFormValues({ ...formValues, title });
    }, [title]);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleRemoveLesson = async (lessonId: number) => {
        await dispatch(removeLesson(lessonId));
        dispatch(getLessons());
    };

    const editLesson = () => {
        setIsEditMode(true);
        handleClose();
    };

    const onChange = (event: any) => {
        const key = event.target.name;
        const value = event.target.value;
        setFormValues({ ...formValues, [key]: value });
    }

    const saveChanges = () => {
        axios.put(`http://localhost:3001/lessons/${id}`, formValues);
        setIsEditMode(false);
    }

    const cancelChanges = () => {
        setFormValues({title: ''});
        setIsEditMode(false);
    }

    const upload = (video: Blob) => {
        dispatch(uploadVideo({ video, token: token || '', lessonId: id }));
    };

    return (
        <Dialog fullWidth open={Boolean(id)} onClose={onCloseModal}>
            <div className="modal-item">
                <div className="modal-item__lesson-title">Урок {id}</div>
                <iframe
                    className="video"
                    src={`https://www.youtube.com/embed/${videoUrl}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
                {!isEditMode ? (
                    <div className="modal-item__title"> Название: {formValues.title}</div>
                ) : (
                    <>
                        <span>Название: </span>
                        <TextField name='title' onChange={onChange} value={formValues.title} />
                    </>
                )}

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
                    <MenuItem onClick={editLesson}>Редактировать</MenuItem>
                </Menu>
                <div className="modal-item__video">
                    <FileDrop borderRadius={'0'} onSendFiles={upload}>
                        dfiv
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

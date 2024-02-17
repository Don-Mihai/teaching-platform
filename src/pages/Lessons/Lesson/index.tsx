import { Button, Dialog } from '@mui/material';
import './Lesson.scss';
import FileDrop from '../../../components/FileDrop';
import { useDispatch, useSelector } from 'react-redux';
import { removeLesson, uploadVideo } from '../../../redux/Lesson';
import { AppDispatch, RootState } from '../../../redux/store';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useEffect } from 'react';
import { getById } from '../../../redux/User';

interface Props {
    onCloseModal: () => void;
    id: number;
    title: string;
    token?: string;
}

const Lesson = ({ id, onCloseModal, title, token }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const lessons = useSelector((store: RootState) => store.lesson.lessons);
    const videoUrl = lessons.find(item => item.id === id)?.urlVideo || '';

    useEffect(() => {
        dispatch(getById());
    }, []);

    const handleRemoveLesson = async (lessongId: number) => {
        dispatch(removeLesson(lessongId));
    };

    const upload = (video: Blob) => {
        dispatch(uploadVideo({ video, token: token || '', lessonId: id }));
    };

    return (
        <Dialog fullWidth open={Boolean(id)} onClose={onCloseModal}>
            <div className="modal-item">
                <div className="modal-item__lesson">Урок {id}</div>
                <iframe
                    className="video"
                    src={`https://www.youtube.com/embed/${videoUrl}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>

                <div> Название: {title}</div>
                <div className="modal-item__video">
                    <FileDrop onSendFiles={upload}>
                        <Button fullWidth>Загрузить видео</Button>
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

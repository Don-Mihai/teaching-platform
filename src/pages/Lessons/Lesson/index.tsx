import { Button, Dialog } from '@mui/material';
import './Lesson.scss';
import FileDrop from '../../../components/FileDrop';
import { useDispatch } from 'react-redux';
import { removeLesson, uploadVideo } from '../../../redux/Lesson';
import { AppDispatch } from '../../../redux/store';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

interface Props {
    onCloseModal: () => void;
    id: number;
    title: string;
    token?: string;
}

const Lesson = ({ id, onCloseModal, title, token }: Props) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleRemoveLesson = async (lessongId: number) => {
        dispatch(removeLesson(lessongId));
    };

    const upload = (video: Blob) => {
        dispatch(uploadVideo({ video, token: token || '' }));
    };

    return (
        <Dialog fullWidth open={Boolean(id)} onClose={onCloseModal}>
            <div className="modal-item">
                <div className="modal-item__lesson">Урок {id}</div>
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUXbmV2ZXIgZ29ubmEgZ2l2ZSB5b3UgdXA%3D" target="_blank">
                    Видео
                </a>
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

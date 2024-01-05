import { Button, Dialog } from '@mui/material';
import './Lesson.scss';
import FileDrop from '../../../components/FileDrop';

interface Props {
    onCloseModal: () => void;
    id: number;
    title: string;
}

const Lesson = ({ id, onCloseModal, title }: Props) => {
    return (
        <Dialog open={Boolean(id)} onClose={onCloseModal}>
            <div className="modal-item">
                <div className="modal-item__lesson">Урок {id}</div>
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUXbmV2ZXIgZ29ubmEgZ2l2ZSB5b3UgdXA%3D" target="_blank">
                    Видео
                </a>
                <div> Название: {title}</div>
                <div className="modal-item__video">
                    <FileDrop onSendFiles={() => {}}>
                        <Button fullWidth>Загрузить видео</Button>
                    </FileDrop>
                </div>
            </div>
        </Dialog>
    );
};

export default Lesson;

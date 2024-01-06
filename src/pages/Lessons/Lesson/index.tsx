<<<<<<< HEAD
import { Dialog } from "@mui/material";
import './Lesson.scss';
import FileDrop from "../../../components/FileDrop";

=======
import { Button, Dialog } from '@mui/material';
import './Lesson.scss';
import FileDrop from '../../../components/FileDrop';
>>>>>>> b86afed7297cd1de8d65dc1fe3941eaf51fd0be5

interface Props {
    onCloseModal: () => void;
    id: number;
<<<<<<< HEAD
}

const Lesson = ({ id, onCloseModal, }: Props) => {
    return (
        <Dialog open={Boolean(id)} onClose={onCloseModal}>
            <div className="modal-lesson">Урок {id}</div>
            <FileDrop onSendFiles={() => { }}>
                <div className=""></div>
            </FileDrop>
        </Dialog >
    );
}

export default Lesson;
=======
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
>>>>>>> b86afed7297cd1de8d65dc1fe3941eaf51fd0be5

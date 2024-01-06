import { Dialog } from "@mui/material";
import './Lesson.scss';
import FileDrop from "../../../components/FileDrop";


interface Props {
    onCloseModal: () => void;
    id: number;
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
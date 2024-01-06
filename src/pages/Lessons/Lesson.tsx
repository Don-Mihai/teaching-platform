import { Dialog } from "@mui/material";
import './Lessons.scss'

interface Props {    
    onCloseModal: () => void;
    id: number;
}

const Lesson = ({id, onCloseModal}: Props) => {
    return (
        <Dialog open={Boolean(id)} onClose={onCloseModal}>
            <div className="modal-lesson">Урок{id}</div>
        </Dialog>
      );
}
 
export default Lesson;
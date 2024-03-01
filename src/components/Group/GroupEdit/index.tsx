import Button from '@mui/material/Button';
import { IGroup } from '../../../redux/Group/types';
import FileDrop from '../../FileDrop';
import { TextField, Snackbar } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { AppDispatch } from '../../../redux/store';
import { edit, uploadVideo } from '../../../redux/Group';
import '../Group.scss';
import './GroupEdit.scss';

interface Props {
    group: IGroup;
    onFlip: () => void;
    isShowed: boolean;
}

const initialState = { name: '', sber: '', nordic: '' };
const GroupEdit = ({ group, isShowed, onFlip }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const [formValues, setFormValues] = useState(initialState);

    const editGroup = async () => {
        const payload = {
            ...group,
            name: formValues.name,
            url: {
                sber: formValues.sber,
                nordic: formValues.nordic,
            },
        };
        dispatch(edit(payload));
    };

    const onChange = (e: any) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };

    return (
        <div className={'group-edit'}>
            <div className="group__title">Редактирование</div>
            <TextField onChange={onChange} value={formValues.name} name="name" placeholder="Введите название группы" fullWidth variant="outlined" />
            <TextField onChange={onChange} value={formValues.sber} name="sber" placeholder="Введите ссылку на сберджаз" fullWidth variant="outlined" />
            <TextField onChange={onChange} value={formValues.nordic} name="nordic" placeholder="Введите ссылку на нордик" fullWidth variant="outlined" />
            <button onClick={onFlip}>Редактировать</button>
            <Button onClick={editGroup}>Сохранить изменения</Button>
        </div>
    );
};

export default GroupEdit;

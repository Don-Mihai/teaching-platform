import GoogleAuth from '../../components/GoogleAuth';
import Group from '../../components/Group';
import './Main.scss';
import { useEffect, useState } from 'react';
import { IGroup } from '../../redux/Group/types';
import Button from '@mui/material/Button';
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { get } from '../../redux/Group';

const Main = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        getGroup();
    }, []);

    const [groups, setGroups] = useState<IGroup[]>([
        {
            id: 1,
            name: 'ВТ/ЧТ',
            url: {
                sber: 'https://jazz.sber.ru/zthtbf?psw=OBEDV0APXRVZAQRBHxtKBlYLGQ',
                inordic: '',
            },
        },
    ]);

    const addGroup = () => {
        const newGroup: IGroup = {
            id: groups.length + 1,
            name: '',
            url: { sber: '', inordic: '' },
        };
        setGroups([...groups, newGroup]);
    };

    const getGroup = async () => {
        dispatch(get());
    };

    return (
        <>
            <GoogleAuth />
            <div className="groups">
                {groups.map(group => (
                    <Group group={group} key={group.id} />
                ))}
            </div>
            <Button onClick={addGroup} variant="contained" color="primary">
                +
            </Button>
        </>
    );
};

export default Main;

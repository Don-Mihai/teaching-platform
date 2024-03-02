import GoogleAuth from '../../components/GoogleAuth';
import Group from '../../components/Group';
import { IGroup } from '../../redux/Group/types';
import './Main.scss';

const Main = () => {
    const groups: IGroup[] = [
        {
            id: 1,
            name: 'ВТ/ЧТ',
            url: {
                sber: 'https://jazz.sber.ru/zthtbf?psw=OBEDV0APXRVZAQRBHxtKBlYLGQ',
                inordic: 'http://study.inordic.ru/panel/users_lesson_visits?group=262',
            },
        },
    ];

    return (
        <>
            <GoogleAuth />
            <div className="groups">
                {groups.map(group => (
                    <Group group={group} key={group.id} />
                ))}
            </div>
        </>
    );
};

export default Main;

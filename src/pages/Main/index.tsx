import GoogleAuth from '../../components/GoogleAuth';
import Group from '../../components/Group';
import './Main.scss';

const Main = () => {
    const groups: any[] = [
        {
            name: 'ВТ/ЧТ',
            url: 'https://jazz.sber.ru/zthtbf?psw=OBEDV0APXRVZAQRBHxtKBlYLGQ',
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

import { Avatar } from "@mui/material";
import FileDrop from "../../../components/FileDrop";
import Level from "../../../components/Level";
import Inputs from "./Inputs/Index";
import { IProfile, PROFILE_KEYS, initState } from "../types";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { IUser } from "../../../redux/User/types";
import './UserData.scss';

interface Props {
	user: IUser;
}
const UserData = ({ user }: Props) => {
    const [formValues, setFormValues] = useState<Partial<IProfile>>(initState);

    useEffect(() => {
        fetchUser();
    }, [user]);

    const fetchUser = async () => {
        setFormValues(user);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (event: FormEvent) => {
        await axios.put(`users/${formValues.id}`, formValues);
    };

    // Этот код - лишь иллюстрация. Вам нужно будет адаптировать его под ваш конкретный случай.
    const uploadVideo = async (videoBlob: Blob) => {
        const url = 'https://www.googleapis.com/upload/youtube/v3/videos?part=snippet,status';

        const formData = new FormData();
        formData.append('video', videoBlob); // Замените videoBlob на ваш файл
        // Добавьте необходимые метаданные
        formData.append(
            'snippet',
            JSON.stringify({
                title: 'Your Video Title',
                description: 'Your Video Description',
                tags: ['tag1', 'tag2'],
                categoryId: '22', // Пример категории, укажите подходящую
            })
        );
        formData.append(
            'status',
            JSON.stringify({
                privacyStatus: 'public', // или 'private', 'unlisted'
            })
        );

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${user.token}`,
                // Для загрузки файлов заголовок 'Content-Type' указывать не нужно, так как используется FormData
            },
            body: formData,
        });

        return response.json(); // Результат загрузки
    };

    return (
        <div className="user-data">
            <div className="user-data__left">
                <div className="user-data__avatar-container">
                    <FileDrop onSendFiles={uploadVideo}>
                        <Avatar className="user-data__avatar" src={formValues?.[PROFILE_KEYS.URL]}>
                            {`${formValues?.[PROFILE_KEYS.FIRST_NAME]?.charAt(0) || ''}${formValues?.[PROFILE_KEYS.LAST_NAME]?.charAt(0) || ''}`}
                        </Avatar>
                    </FileDrop>
                    <div className="user-data__title-wrap">
                        <h3 className="user-data__avatar-title">{user.firstName}</h3>
                        <h4 className="user-data__avatar-date">Join 12.12.2023</h4>
                    </div>
                </div>
                <Level level={1} xp={250} maxXp={500} />
            </div>
            <div className="user-data__right">
                <Inputs handleChange={handleChange} handleSubmit={handleSubmit} formValues={formValues} />
            </div>
        </div>
    );
};
 
export default UserData;
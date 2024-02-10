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
        const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,status&key=AIzaSyCSeIm1ppEAwviPLlfVIT1MtwTOfpnB6To`;
        const formData = new FormData();
        formData.append('media_body', videoBlob);
        formData.append(
            'snippet',
            JSON.stringify({
                title: 'title',
            })
        );
        formData.append(
            'status',
            JSON.stringify({
                privacyStatus: 'public', // или 'private', 'unlisted'
            })
        );

        const response = await axios.post(url, formData, {
            headers: {
                Authorization: `Bearer ya29.a0AfB_byAUdk3CymTycC4hnvPDUgAzXYUf2XXl-LDg1QBo-DrB2bMsxihiYfysTn9HnvIurnjN_VaiFqHmEADc7LbjA1RP8ArZ_Zii7_hZJ1Ymv5m8s34kY-l-8C3Cv8X21LYlU1JHBeiCJAW8uHOIQ7-PM9bzduokq4UaCgYKAbYSARESFQHGX2MiEkKFJf0TFX6rx8HdKnfGDA0170`,
            },
        });

        return response;
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
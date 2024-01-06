import axios from 'axios';
import { useEffect, useState } from 'react';

export interface ILesson {
    id: number;
    title: string;
}

const Lessons = () => {
    const [lessons, setLessons] = useState<ILesson[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const lessons = (await axios.get(' http://localhost:3001/lessons')).data;
        setLessons(lessons);
    };

    return (
        <div>
            {lessons.map(item => {
                return <div>{item?.title}</div>;
            })}
        </div>



    );
};

export default Lessons;

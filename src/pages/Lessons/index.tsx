import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import './Lessons.scss';
import { useNavigate } from 'react-router-dom';
import Lesson from './Lesson';

interface ILesson {
    id: number;
    title: string;
}

const Lessons = () => {
    const [lessons, setLessons] = useState<ILesson[]>([]);

    const [id, setId] = useState<number>(0);

    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const lessons = (await axios.get(' http://localhost:3001/lessons')).data;
        setLessons(lessons);
    };

    const onLessonClick = (id: number) => {
        setId(id);
    };

    const onCloseModal = () => {
        setId(0);
    };

    return (
        <div className="lessons-page">
            <Header />
            <div className="lessons-page__content">
                {lessons.map(item => {
                    return (
                        <div key={item.id} onClick={() => onLessonClick(item.id)} className="lesson">
                            {item?.title}
                        </div>
                    );
                })}
            </div>
            <Lesson id={id} onCloseModal={onCloseModal} />
        </div>
    );
};

export default Lessons;

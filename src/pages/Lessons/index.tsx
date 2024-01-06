import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import './Lessons.scss';
import Lesson from './Lesson';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export interface ILesson {
    id: number;
    title: string;
}

const Lessons = () => {
    const [lessons, setLessons] = useState<ILesson[]>([]);
    const [id, setId] = useState<number>(0);

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

    const onRemoveLesson = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3001/lessons/${id}`);
            fetchData();
        } catch (error) {
            console.error('Error removing lesson:', error);
        }
    };

    return (
        <div className="lessons-page">
            <Header />
            <div className="lessons-page__content">
                {lessons.map(item => {
                    return (
                        <div className="lessons-page__main">
                            <div key={item.id} onClick={() => onLessonClick(item.id)} className="lesson">
                                <h3>{item?.title}</h3>
                            </div>
                            <button onClick={() => onRemoveLesson(item.id)}>
                                <RemoveCircleOutlineIcon />
                            </button>
                        </div>
                    );
                })}
            </div>
            <Lesson id={id} onCloseModal={onCloseModal} title={lessons.find(item => item.id === id)?.title || ''} />
        </div>
            
       
       
    );
};

export default Lessons;

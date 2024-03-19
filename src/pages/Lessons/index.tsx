import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import './Lessons.scss';
import Lesson from './Lesson';
import { useDispatch, useSelector } from 'react-redux';
import { getLessons, removeLesson } from '../../redux/Lesson';
import { AppDispatch, RootState } from '../../redux/store';

export interface ILesson {
  id: number;
  title: string;
}

const Lessons = () => {
  const [id, setId] = useState<number>(0);
  const lessons = useSelector((store: RootState) => store.lesson.lessons);
  const token = useSelector((store: RootState) => store.user.token);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getLessons());
  }, []);

  const onLessonClick = (id: number) => {
    setId(id);
  };

  const onCloseModal = () => {
    setId(0);
  };

  const onDeleteLesson = async (lessongId: number) => {
    await dispatch(removeLesson(lessongId));
  };

  return (
    <div className="lessons-page">
      <Header />
      <div className="lessons-page__content">
        {lessons.map((item) => {
          return (
            <div className="lessons-page__main">
              <div key={item.id} onClick={() => onLessonClick(item.id)} className="lesson">
                <h3 className="lesson__title">{item?.title}</h3>
              </div>
              <button onClick={() => onDeleteLesson(item.id)}>X</button>
            </div>
          );
        })}
      </div>
      <Lesson id={id} onCloseModal={onCloseModal} title={lessons.find((item) => item.id === id)?.title || ''} token={token} />
    </div>
  );
};

export default Lessons;

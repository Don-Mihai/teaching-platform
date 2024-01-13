export interface ILesson {
    id: number;
    title: string;
}

export interface LessonState {
    lessons: ILesson[];
}

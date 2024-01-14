export interface ILesson {
    [LESSON_KEYS.id]: number;
    [LESSON_KEYS.attendance]?: number[];
    [LESSON_KEYS.title]: string;
    [LESSON_KEYS.teacherId]: string | number;
    [LESSON_KEYS.createDate]: string;
    [LESSON_KEYS.moduleId]: string | number;
    [LESSON_KEYS.groupId]: string | number;
}

export interface PLesson {
    [LESSON_KEYS.title]: string;
    [LESSON_KEYS.teacherId]: string | number;
    [LESSON_KEYS.createDate]: string;
    [LESSON_KEYS.moduleId]: string | number;
    [LESSON_KEYS.groupId]: string | number;
}

export enum LESSON_KEYS {
    id = 'id',
    attendance = 'attendance',
    title = 'title',
    teacherId = 'teacherId',
    createDate = 'createDate',
    moduleId = 'moduleId',
    groupId = 'groupId',
}

export interface LessonState {
    lessons: ILesson[];
}

export enum PAGE_ROUTES {
    Auth = '/',
    Modules = '/modules',
    Listeners = '/listeners',
    Tasks = '/tasks',
    Profile = '/profile',
	Lessons = '/lessons',
}

export interface IGroups {
    group: string;
}

export interface IGroup {
    teacher: string;
    students: string;
}

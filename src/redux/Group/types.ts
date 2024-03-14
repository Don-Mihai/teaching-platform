export interface PUploadVideo {
    video: Blob;
    token: string;
    title?: string;
}

export interface IUrl {
    sber: string;
    inordic: string;
}

export interface IGroup {
    id: number | string;
    name: string;
    url: IUrl;
    userId: number | string;
}

export interface GroupsState {
    groups: IGroup[];
}

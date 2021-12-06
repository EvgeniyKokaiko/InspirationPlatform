export interface User {
    avatar: string,
    date_of_birth: string,
    description: string,
    email: string,
    full_name: string,
    gender: string,
    location: string,
    personal_site: string,
    username: string,
}
export interface Post {
    id: number;
    owner: string;
    type: number;
    image: string;
    video: string;
    caption: string;
    like_id: string;
    date_of_creation: string;
    data_count: number;
}
export interface Asset {
    base64?: string;
    uri?: string;
    width?: number;
    height?: number;
    fileSize?: number;
    type?: string;
    fileName?: string;
    duration?: number;
}
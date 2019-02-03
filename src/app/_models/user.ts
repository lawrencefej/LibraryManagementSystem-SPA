import { Photo } from './photo';

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    age: number;
    created: Date;
    lastActive: Date;
    photoUrl: string;
    city: string;
    state: string;
    zipcode: string;
    profilepicture?: Photo[];
    roles?: string[];
}

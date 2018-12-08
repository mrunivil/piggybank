import { User } from './user';

export interface Feedback {
    readonly id?: string;
    points: number;
    comment: string;
    user: User;
    rating: number;
}
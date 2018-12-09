import { User } from './user';

export interface Feedback {
    readonly id?: string;
    comment: string;
    user: User;
    rating: number;
}
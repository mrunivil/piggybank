import { User } from './user';
import { Action } from './action';

export interface Bank {
    id: string;
    photoURL: string;
    owner: User;
    members: User[];
    history: Action[];
    balance: number;
}

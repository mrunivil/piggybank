import { User } from './user';
import { Action } from './action';

export interface Bank {
    id: string;
    name: string;
    photoURL?: string;
    owner?: User;
    members?: User[];
    history?: Action[];
    balance?: number;
    paypal?: boolean;
    paypal_account?: string;
}

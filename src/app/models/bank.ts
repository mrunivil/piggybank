import { User } from './user';
import { History } from './action';

export interface Bank {
    id: string;
    name: string;
    photoURL?: string;
    owner?: User;
    members?: User[];
    history?: History[];
    balance?: number;
    paypal?: boolean;
    paypal_account?: string;
}

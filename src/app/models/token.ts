export class Token {
    uid: string;
    bankid: string;
    valid: Date;
    target: string;
    constructor(_bankid: string, _uid?: string, _target?: string, _valid?: Date) {
        this.bankid = _bankid;
        this.uid = _uid;
        this.target = _target;
        this.valid = _valid;
    }
}
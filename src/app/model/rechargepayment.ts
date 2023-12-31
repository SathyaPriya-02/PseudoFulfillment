export class rechargepayment
{
    constructor(public firstname : string,
        public emailid : string,
        public simnumber: string,
        public phonenumber : string,
        public planname : string,
        public price : number,
        public validity : number,
        public transactionid : string,
        public rechargedate : Date,
        public expiredate : Date,
        public wallet : number

        ) {}
}
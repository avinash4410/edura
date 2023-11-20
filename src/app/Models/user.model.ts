export class User{
    constructor(
        private _id: string,
        public firstName:string,
        public email:string,
        private _token:string,
        private _tokenExpirationDate:Date,
        public password?:string,
        public role?:any
        ){}

    get token(){
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate)
            return null;
        return this._token
    }
}
export interface AuthResponse{
    _id: string
    firstName:string,
    token:string,
    email:string,
    password:string,
    expiresIn:string,
    role:Array<string>,
    isError?:boolean
    error?:any
}
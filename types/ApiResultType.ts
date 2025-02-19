export  default interface Result<T>{
    data:T,
    isSuccess:boolean,
    message:string|null,
    messages:string[]|null,
    statusCode:number
}
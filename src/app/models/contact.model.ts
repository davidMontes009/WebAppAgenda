export class ContactModel{
    constructor(
        public  idContact:number,
        public  nombre:string,
        public  apellidos:string,
        public  telefono:string,
        public  tipoTel:number,
        public  email:string
    ){}
}
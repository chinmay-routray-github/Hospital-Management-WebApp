export class user{
    public id : number;
    public name : string;
    public email : string;
    public password : string;
    public phone : string;
    public question : string;
    public answer : string;

    constructor(id: number, name:string, email: string, password: string, phone: string, question: string, answer:string){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.question = question;
        this.answer = answer;
    }
}
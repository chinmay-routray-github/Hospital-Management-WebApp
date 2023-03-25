export class doctor{
    public id : number;
    public name : string;
    public email : string;
    public password : string;
    public phone : string;
    public specialization : string;
    public experience : number;

    constructor(id: number, name:string, email: string, password: string, phone: string, spec: string, exp:number){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.specialization = spec;
        this.experience = exp;
    }
}
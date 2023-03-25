export class doctor{
    public name : string;
    public specialization : string;
    public experience : string;
    public imgPath : string

    constructor(name:string, spec: string, exp: string, imgPath: string){
        this.name = name;
        this.specialization = spec;
        this.experience = exp;
        this.imgPath = imgPath;
    }
}
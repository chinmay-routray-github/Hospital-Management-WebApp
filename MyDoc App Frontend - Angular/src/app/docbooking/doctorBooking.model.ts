export class doctorBooking{
    public id : number;
    public userName : string;
    public doctorName : string
    public patientName : string;
    public patientGender : string;
    public patientAge : string;
    public symptoms : string;
    public date : string;
    public time : string;
    

    constructor(id: number, name:string, docName : string, patName : string, gender : string,
        age : string, symptoms : string, date: string, time: string){
        this.id = id;
        this.userName = name;
        this.doctorName = docName;
        this.patientName = patName;
        this.patientGender = gender;
        this.patientAge = age;
        this.symptoms = symptoms;
        this.date = date;
        this.time = time;
    
    }
}
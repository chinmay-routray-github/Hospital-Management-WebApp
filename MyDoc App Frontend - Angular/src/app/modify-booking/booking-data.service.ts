import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingDataService { 
  doctorName : string = '';
  patientName : string = '';
  patientGender : string = '';
  patientAge : string = '';
  symptoms : string = '';
  date : string = '';
  time : string = '';

  constructor() {
      
     }

  setData(data1 : string, data2 : string, data3 : string, data4 : string, data5 : string,
    data6 : string, data7 : string){
      this.doctorName = data1,
      this.patientName = data2,
      this.patientGender = data3,
      this.patientAge = data4,
      this.symptoms = data5,
      this.date = data6,
      this.time = data7
  }

  getDoctorname(){
    return this.doctorName;
  }

  getPatientname(){
    return this.patientName;
  }

  getPatientgender(){
    return this.patientGender;
  }

  getPatientage(){
    return this.patientAge;
  }

  getSymptoms(){
    return this.symptoms;
  }

  getDate(){
    return this.date;
  }

  getTime(){
    return this.time;
  }
}

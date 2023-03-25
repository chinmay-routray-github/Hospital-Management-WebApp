import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoctorNameService {
  doctorName : string = '';

  constructor() { }

  setName(data : string){
    this.doctorName = data;
  }

  getName(){
    return this.doctorName;
  }
}

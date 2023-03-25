import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentIdService {

  Id : string = '';

  constructor() { }

  setId(id : string){
    this.Id = id;
  }

  getId(){
    return this.Id;
  }
}

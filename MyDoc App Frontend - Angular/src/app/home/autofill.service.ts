import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutofillService {
  email : string = '';
  password : string = '';
  phone : string = '';
  question : string = '';
  answer : string = '';

  constructor() { }

  setData(data1 : string, data2 : string, data3 : string, data4 : string, data5 : string,){
    this.email = data1;
    this.password = data2;
    this.phone = data3;
    this.question = data4;
    this.answer = data5;
  }

  getEmail(){
    return this.email;
  }

  getPassword(){
    return this.password;
  }

  getPhone(){
    return this.phone;
  }

  getQuestion(){
    return this.question;
  }

  getAnswer(){
    return this.answer;
  }
}

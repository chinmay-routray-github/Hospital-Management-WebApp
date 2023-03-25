import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsernameService {
  name :any = '';
  token : string = '';
  arr: any = []; 

  constructor(private http : HttpClient) { }

  setName(data: any){
    this.name = data;
  }

  getName(){
    return this.name;
  }
}
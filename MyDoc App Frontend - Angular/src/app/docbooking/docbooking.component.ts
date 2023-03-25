import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UsernameService } from '../patient-login-page/username.service';
import { doctorBooking } from './doctorBooking.model';

@Component({
  selector: 'app-docbooking',
  templateUrl: './docbooking.component.html',
  styleUrls: ['./docbooking.component.css']
})
export class DocbookingComponent implements OnInit{

  name : string = '';
  arr:any=[];
  brr:any=[];
  err : boolean = false;

  constructor(private http: HttpClient, private userName: UsernameService){}

  ngOnInit(): void {
    this.http.get("http://127.0.0.1:8000/user/username/"+ localStorage.getItem("access_token"))
    .subscribe(val =>{this.brr = val;
      this.userName.setName(this.brr);
    });
    this.name = this.userName.getName();
  }

  geDoctorBookings(){
    this.http.get<doctorBooking>('http://127.0.0.1:9000/doctor/appointment/get/' + this.name)
    .subscribe(data =>{this.arr = data;
    if(this.arr){
      this.err = false;
      console.log(this.err);
      console.log(this.arr);
    }
    else{
      this.err = true
      console.log(this.err);
      console.log(this.arr);
    }
    });
    console.log(this.arr);
  }

}

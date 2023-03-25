import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingDataService } from '../modify-booking/booking-data.service';
import { PatientLoginPageComponent } from '../patient-login-page/patient-login-page.component';
import { UsernameService } from '../patient-login-page/username.service';
import { AppointmentIdService } from './appointment-id.service';
import { userBooking } from './userBooking.model';

@Component({
  selector: 'app-appointment-page',
  templateUrl: './appointment-page.component.html',
  styleUrls: ['./appointment-page.component.css']
})
export class AppointmentPageComponent implements OnInit{
  name : any = '';
  arr:any=[];
  brr:any=[];
  drr:any=[];
  err : boolean = false;
  // detailMode : boolean = false;
  Id : string = '';
  today = new Date();

  // cancelBooking : FormGroup;
  constructor(private http: HttpClient, private userName:UsernameService, private bookingData : BookingDataService,
        private router: Router, private appointmentId : AppointmentIdService){
    //  this.cancelBooking = new FormGroup({
    //   'bookingId' : new FormControl(null, Validators.required), 
    // })
  }

  ngOnInit(): void {
    this.http.get("http://127.0.0.1:8000/user/username/"+ localStorage.getItem("access_token"))
    .subscribe(val =>{this.brr = val;
      this.userName.setName(this.brr);
    });
    this.name = this.userName.getName();
  }

  getUserBookings(){
    // this.detailMode = true;
    this.http.get<userBooking>('http://127.0.0.1:8000/user/appointment/get/' + this.name)
    .subscribe(data =>{this.arr = data;
    if(this.arr[0].date ){
      this.err = false
      console.log(this.err);
      console.log(this.arr.date);
    }
    else{
      this.err = true
      console.log(this.err);
      console.log(this.arr);
    }
    });
    
    
  }

  modifyBooking(data0 :  string, data1 : string, data2 : string, data3 : string, 
    data4 : string, data5 : string, data6 : string, data7 : string){
    this.appointmentId.setId(data0);
    this.bookingData.setData(data1, data2, data3, data4, data5, data6, data7);
    this.router.navigate(['/user/appointments/modify'])
  }


  deleteBooking(data : string){
    this.appointmentId.setId(data);
    this.Id = this.appointmentId.getId();
    alert("Are you sure you want to delete Appointment with doctor?")
    this.http.delete('http://127.0.0.1:8000/user/appointment/delete/'+ this.Id)
    .subscribe(data =>{this.drr});
    // this.cancelBooking.reset();
    this.router.navigate(['/user/mydocs'])
  }
}

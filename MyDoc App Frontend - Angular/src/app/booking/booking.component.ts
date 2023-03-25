import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorNameService } from '../doctor-list/doctor-name.service';
import { UsernameService } from '../patient-login-page/username.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit{
  today = new Date();
  date = new Date();
  
  userBooking : FormGroup;
  data = {};
  err : boolean = false;

  constructor(private router: Router, private http: HttpClient,
        private username : UsernameService, private doctorName : DoctorNameService){
    this.userBooking = new FormGroup({
      // 'username' : new FormControl(null, Validators.required), 
      'doctorName' : new FormControl(null, Validators.required),
      'patientName' : new FormControl(null, Validators.required),
      'patientGender' : new FormControl(null, Validators.required),
      'patientAge' : new FormControl(null, Validators.required),
      'symptoms' : new FormControl(null, Validators.required),
      'date' : new FormControl(null, Validators.required),
      'time' : new FormControl(null, Validators.required)
    })
  }

  
  ngOnInit(){
    this.userBooking = new FormGroup({
      // 'username' : new FormControl(null, Validators.required), 
      'doctorName' : new FormControl(this.doctorName.getName(), Validators.required),
      'patientName' : new FormControl(null, Validators.required),
      'patientGender' : new FormControl(null, Validators.required),
      'patientAge' : new FormControl(null, Validators.required),
      'symptoms' : new FormControl(null, Validators.required),
      'date' : new FormControl(null, Validators.required),
      'time' : new FormControl(null, Validators.required)
    })
    this.date.setDate(this.today.getDate()+1);
  }

  onBooking(){

    this.data = {
        "user_name": this.username.getName(),
        "doctor_name" : this.userBooking.value.doctorName,
        "patient_name": this.userBooking.value.patientName,
        "patient_gender": this.userBooking.value.patientGender,
        "patient_age": this.userBooking.value.patientAge,
        "date": this.userBooking.value.date,
        "time": this.userBooking.value.time,
        "symptoms" : this.userBooking.value.symptoms
    }
    console.log( this.userBooking.value);
    if(this.userBooking.valid){
      this.http.post('http://127.0.0.1:8000/user/appointment/new', this.data).subscribe(responseData => {
      console.log(responseData);
      if(responseData){
        this.router.navigate(['/user/paygate']);
      }
      else{
        this.err = true;
      }
    });
    }
    
  }
}

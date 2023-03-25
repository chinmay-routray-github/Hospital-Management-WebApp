import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppointmentIdService } from '../appointment-page/appointment-id.service';
import { UsernameService } from '../patient-login-page/username.service';
import { BookingDataService } from './booking-data.service';

@Component({
  selector: 'app-modify-booking',
  templateUrl: './modify-booking.component.html',
  styleUrls: ['./modify-booking.component.css']
})
export class ModifyBookingComponent implements OnInit{

  modifyBooking : FormGroup;
  today = new Date();
  date = new Date();
  err : boolean = false;
  id : string = '';
  data = {};
  arr : any = [];

  constructor(private bookingData : BookingDataService, private bookingId : AppointmentIdService,
      private username : UsernameService, private router : Router, private http : HttpClient){
    this.modifyBooking = new FormGroup({
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
  
  ngOnInit(): void {
    this.modifyBooking = new FormGroup({
      'username' : new FormControl(this.username.getName(), Validators.required), 
      'doctorName' : new FormControl(this.bookingData.getDoctorname(), Validators.required),
      'patientName' : new FormControl(this.bookingData.getPatientname(), Validators.required),
      'patientGender' : new FormControl(this.bookingData.getPatientgender(), Validators.required),
      'patientAge' : new FormControl(this.bookingData.getPatientage(), Validators.required),
      'symptoms' : new FormControl(this.bookingData.getSymptoms(), Validators.required),
      'date' : new FormControl(this.bookingData.getDate(), Validators.required),
      'time' : new FormControl(this.bookingData.getTime(), Validators.required)
    })
    this.date.setDate(this.today.getDate()+1);
  }

  onModify(){
    this.id = this.bookingId.getId();
    this.data = {
      "user_name": this.username.getName(),
      "doctor_name": this.modifyBooking.value.doctorName,
      "patient_name": this.modifyBooking.value.patientName,
      "patient_gender": this.modifyBooking.value.patientGender,
      "patient_age": this.modifyBooking.value.patientAge,
      "symptoms": this.modifyBooking.value.symptoms,
      "date": this.modifyBooking.value.date,
      "time": this.modifyBooking.value.time
    }
    console.log(this.data);
    if(this.modifyBooking.valid){
      this.http.put('http://127.0.0.1:8000/user/appointment/modify/'+ this.id, this.data)
    .subscribe(responseData => {
      console.log(responseData);
      if(responseData){
        alert("Changes made successfully. Please check your appointment details.");
        this.router.navigate(['/user/appointments']);
      }
      else{
        this.err = true;
      }
    })
    }
    
  }
}

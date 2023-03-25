import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsernameService } from '../patient-login-page/username.service';
import { DoctorNameService } from './doctor-name.service';
import { doctor } from './doctor.model';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit{
  doctors : doctor[] = [
    new doctor('Madhav', 'Surgeon', '10 years experience', 'https://www.freepngimg.com/download/icon/1000106-unknown-man-emoji-icon-free-photo.png'),
    new doctor('Keshav', 'Neurologist', '12 years experience', 'https://www.freepngimg.com/download/icon/1000106-unknown-man-emoji-icon-free-photo.png'),
    new doctor('Aman', 'Cardiologist', '15 years experience', 'https://www.freepngimg.com/download/icon/1000106-unknown-man-emoji-icon-free-photo.png'),
    new doctor('Shweta', 'Gynecologist', '13 years experience', 'https://media.istockphoto.com/id/487234780/photo/unknown-businesswoman-silhouette.jpg?s=612x612&w=0&k=20&c=oCn5h_8Zfc40PBxtgwdNrVDOnGhJiVSJXpJkrHP_Lk0=')
  ];

  arr:any=[];
  brr:any=[];
  name : string = '';
  docName: any = '';


  constructor(private router:Router, private http : HttpClient,
        private username : UsernameService, private doctorName : DoctorNameService){}
  
  ngOnInit(){
    this.http.get("http://127.0.0.1:8000/user/username/"+ localStorage.getItem("access_token"))
    .subscribe(val =>{this.arr = val;
      this.username.setName(this.arr);
    });
    this.name = this.username.getName();
    this.http.get('http://127.0.0.1:8000/user/short_info/'+ this.name)
    .subscribe(data =>{this.brr = data});
  }

  bookAppointment(data : string){
    this.docName = this.doctorName.setName(data);
    this.router.navigate(['user/bookings']);
  }
}

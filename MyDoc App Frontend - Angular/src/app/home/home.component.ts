import { Component, Injectable, OnInit, OnChanges, DoCheck } from '@angular/core';
import { PatientLoginPageComponent } from '../patient-login-page/patient-login-page.component';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { user } from './user.model';
import { UsernameService } from '../patient-login-page/username.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AutofillService } from './autofill.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{  
  arr:any=[];
  brr:any=[];
  crr:any=[];
  drr:any=[];
  name : string = ''; temp : any ; temp1 : any ;
  editMode : boolean = true;
  detailMode : boolean = false;
  userEditform : FormGroup;
  data = {};
  Pass : boolean = false;

  constructor(private http: HttpClient, private userName : UsernameService,
        private router: Router, private userData : AutofillService) { 
          this.userEditform = new FormGroup({
            // 'username' : new FormControl('Username', Validators.required), 
            'email' : new FormControl(this.userData.getEmail(), [Validators.required, Validators.email]),
            'password' : new FormControl('Password', Validators.required),
            'phone' : new FormControl(userData.getPhone(), Validators.required),
            'question' : new FormControl(userData.getQuestion()),
            'answer' : new FormControl(userData.getAnswer(), Validators.required)
          })
  }

  ngOnInit() {
    this.detailMode = false;
    this.http.get("http://127.0.0.1:8000/user/username/"+ localStorage.getItem("access_token"))
    .subscribe(val =>{this.crr = val;
      this.userName.setName(this.crr);
    });
    this.name = this.userName.getName();
    this.http.get('http://127.0.0.1:8000/user/short_info/'+ this.name)
    .subscribe(data =>{this.brr = data});
    console.log(this.brr);
  }

  
  getUserDetails(){
    this.detailMode = true;
    this.editMode = false;
    this.Pass = false;
    this.http.get<user>('http://127.0.0.1:8000/user/info/'+ this.name)
    .subscribe(data =>{this.arr = data;
      this.userData.setData(this.arr[0].email, this.arr[0].password, this.arr[0].phone, this.arr[0].question, this.arr[0].answer);
    });
    console.log(this.arr);
    console.log(this.userData);
    console.log(this.userData.getEmail());
    this.userEditform = new FormGroup({ 
      'email' : new FormControl(this.userData.getEmail(), [Validators.required, Validators.email]),
      'password' : new FormControl('Password', Validators.required),
      'phone' : new FormControl(this.userData.getPhone(), Validators.required),
      'question' : new FormControl(this.userData.getQuestion()),
      'answer' : new FormControl(this.userData.getAnswer(), Validators.required)
    })
  }

  editUserDetails(){
    this.data = {
      "name": this.name,
      "email": this.userEditform.value.email,
      "password": this.userEditform.value.password,
      "phone": this.userEditform.value.phone,
      "question": this.userEditform.value.question,
      "answer": this.userEditform.value.answer
    }
    
    if(this.userEditform.valid){
      alert('Do you really want to make the changes?');
      this.http.put('http://127.0.0.1:8000/user/update/'+ this.name, this.data)
    .subscribe(responseData => {
      console.log(responseData);})
      this.detailMode = false;
    }
    console.log(this.editMode);
    console.log(this.detailMode);
  }

  onEditButton(){
    this.editMode = !this.editMode;
    console.log(this.editMode);
    console.log(this.detailMode);
  }

  deleteUser(){
    alert("Are you sure you want to delete the account permanently?")
    this.http.delete('http://127.0.0.1:8000/user/delete/'+ this.name).subscribe(data =>{this.drr});
    this.router.navigate(['/user']);
  }

  showPassword(){
    this.Pass = !this.Pass;
    console.log(this.Pass)
  }
}

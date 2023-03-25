import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styleUrls: ['./new-patient.component.css']
})
export class NewPatientComponent {
  newUser : FormGroup ;
  data = {};
  err : boolean = false;
  Pass : boolean = false;

  constructor(private router: Router, private http:HttpClient,
    private route: ActivatedRoute){
    this.newUser = new FormGroup({
      'username' : new FormControl('Username', Validators.required), 
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'password' : new FormControl(null, Validators.required),
      'phone' : new FormControl(null, Validators.required),
      'question' : new FormControl(null),
      'answer' : new FormControl(null, Validators.required)
    })
  }

  // ngOnInit(){
  //   this.newUser = new FormGroup({
  //     'username' : new FormControl('Username', Validators.required), 
  //     'email' : new FormControl(null, [Validators.required, Validators.email]),
  //     'password' : new FormControl(null, Validators.required),
  //     'phone' : new FormControl(null, Validators.required),
  //     'question' : new FormControl(null),
  //     'answer' : new FormControl(null, Validators.required)
  //   }
  onRegister() {
    this.data = {
      "name": this.newUser.value.username,
      "email": this.newUser.value.email,
      "password": this.newUser.value.password,
      "phone": this.newUser.value.phone,
      "question": this.newUser.value.question,
      "answer": this.newUser.value.answer
    }
    console.log(this.newUser.value);
    if(this.newUser.valid){
      this.http.post('http://127.0.0.1:8000/user/add', this.data).subscribe(responseData => {
      console.log(responseData);
      if(responseData){
        this.router.navigate(['/user']);
      }
      else{
        this.err = true;
      }
    });
    }
    
  }

  showPassword(){
    this.Pass = !this.Pass;
    console.log(this.Pass)
  }
  
  }

  





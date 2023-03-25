import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { LoginService } from './login.service';
import { UsernameService } from './username.service';

@Component({
  selector: 'app-patient-login-page',
  templateUrl: './patient-login-page.component.html',
  styleUrls: ['./patient-login-page.component.css']
})

@Injectable()
export class PatientLoginPageComponent implements OnInit{
  title = 'My Doc App';
  logedIn = false;
  name = '';
  brr : any = [];
  Pass : boolean = false;

  constructor(private router: Router, private http: HttpClient,
    private route: ActivatedRoute,
    private userName: UsernameService,
    private authentication: LoginService){}

  onUserLogin(form : NgForm){
    // http request
    this.logedIn = true;
    this.name = form.value.username;
    this.userName.setName(this.name);
    console.log(this.name, form.value);

    if(form.valid){
      this.authentication.login(form.value).subscribe(result =>{
        // if(result.success){
        //   console.log(result);
        //   alert(result.message);
        // }else{
        //   alert(result.message);
        // }
        console.log(result.access_token)
        localStorage.setItem('access_token', result.access_token)
        if(result.access_token){
          form.reset();
          this.router.navigate(['mydocs'], {relativeTo: this.route});
          alert('Login successful');
        }
        else{
          alert('Invalid Credentials');
        }
      })
    }
    
  }

  onSignup(){
    this.router.navigate(['/newuser']);
  }

  ngOnInit() {
    this.http.get('http://127.0.0.1:9000/doctor/all_short_info')
      .subscribe(data =>{this.brr = data});
      console.log(this.brr);
      this.Pass = false;
  }

  showPassword(){
    this.Pass = !this.Pass;
    console.log(this.Pass)
  }
}

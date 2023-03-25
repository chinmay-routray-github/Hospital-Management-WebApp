import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router';
import { LoginService } from '../patient-login-page/login.service';
import { UsernameService } from '../patient-login-page/username.service';

@Component({
  selector: 'app-doc-login-page',
  templateUrl: './doc-login-page.component.html',
  styleUrls: ['./doc-login-page.component.css']
})
export class DocLoginPageComponent implements OnInit{
  title = 'My Doc App';
  name : string = '';
  brr : any = [];
  Pass : boolean = false;
  
  constructor(private router: Router, private http: HttpClient,
        private userName : UsernameService, private authentication : LoginService){}

  onLogin(form : NgForm){
    // console.log(form.value); http request goes here
    this.name = form.value.username;
    this.userName.setName(this.name);
    
    console.log(this.name, form.value);

    if(form.valid){
      this.authentication.docLogin(form.value).subscribe(result =>{
        
        console.log(result.access_token)
        localStorage.setItem('access_token', result.access_token)
        if(result.access_token){
          form.reset();
          this.router.navigate(['/doctor/home']);
          alert('Login successful');
        }
        else{
          alert('Invalid Credentials');
        }
      })
    }
  }
  ngOnInit(): void {
    this.http.get('http://127.0.0.1:9000/doctor/all_short_info')
      .subscribe(data =>{this.brr = data});
      console.log(this.brr);
  }

  showPassword(){
    this.Pass = !this.Pass;
    console.log(this.Pass)
  }
}
// , {relativeTo: this.route}
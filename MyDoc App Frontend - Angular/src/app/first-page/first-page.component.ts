import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit{
  title = 'My Doc App';
  brr : any = [];

  constructor(private router: Router, private http: HttpClient,
      private route: ActivatedRoute){}

  ngOnInit(): void {
    this.http.get('http://127.0.0.1:9000/doctor/all_short_info')
      .subscribe(data =>{this.brr = data});
      console.log(this.brr);
  }

  userLogin(){
    this.router.navigate(['user'], {relativeTo: this.route});
  }

  docLogin(){
    this.router.navigate(['doctor'], {relativeTo: this.route});
  }
}

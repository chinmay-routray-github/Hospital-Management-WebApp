import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutofillService } from '../home/autofill.service';
import { UsernameService } from '../patient-login-page/username.service';
import { doctor } from './doc.model';

@Component({
  selector: 'app-dochome',
  templateUrl: './dochome.component.html',
  styleUrls: ['./dochome.component.css']
})
export class DochomeComponent implements OnInit{
  name : string = '';
  arr:any=[];
  brr:any=[];
  crr:any=[];
  drr:any=[];
  editMode : boolean = true;
  detailMode : boolean = false;
  docEditform : FormGroup;
  data = {};
  Pass : boolean = false;

  constructor(private http:HttpClient, private userName: UsernameService,
        private router: Router, private doctorData : AutofillService){
          this.docEditform = new FormGroup({
            // 'username' : new FormControl(null, Validators.required), 
            'email' : new FormControl(null, [Validators.required, Validators.email]),
            'password' : new FormControl(null, Validators.required),
            'phone' : new FormControl(null, Validators.required),
            'specialization' : new FormControl(null),
            'experience' : new FormControl(null, Validators.required)
          })
        }

  ngOnInit(): void {
      this.detailMode = false;
      this.http.get("http://127.0.0.1:9000/doctor/username/"+ localStorage.getItem("access_token"))
      .subscribe(val =>{this.crr = val;
      this.userName.setName(this.crr);
    });
      this.name = this.userName.getName();
      this.http.get('http://127.0.0.1:9000/doctor/short_info/'+ this.name)
      .subscribe(data =>{this.brr = data});
      console.log(this.brr);
  }

  getDoctorDetails(){
    this.detailMode = true;
    this.editMode = false;
    this.Pass = false;
    this.http.get<doctor>('http://127.0.0.1:9000/doctor/info/'+ this.name)
    .subscribe(data =>{this.arr = data
    this.doctorData.setData(this.arr[0].email, this.arr[0].password, this.arr[0].phone,
          this.arr[0].specialization, this.arr[0].experience)
    });
    console.log(this.arr);
    this.docEditform = new FormGroup({
      // 'username' : new FormControl(null, Validators.required), 
      'email' : new FormControl(this.doctorData.getEmail(), [Validators.required, Validators.email]),
      'password' : new FormControl('Password', Validators.required),
      'phone' : new FormControl(this.doctorData.getPhone(), Validators.required),
      'specialization' : new FormControl(this.doctorData.getQuestion()),
      'experience' : new FormControl(this.doctorData.getAnswer(), Validators.required)
    })
  }


  onEdit(){
    this.editMode = !this.editMode;
  }

  editDoctorDetails(){
    this.data = {
      "name": this.name,
      "email": this.docEditform.value.email,
      "password": this.docEditform.value.password,
      "phone": this.docEditform.value.phone,
      "specialization": this.docEditform.value.specialization,
      "experience": this.docEditform.value.experience
    }
    // this.editMode = !this.editMode;
    if(this.docEditform.valid){
      alert('Do you really want to make the changes?');
      this.http.put('http://127.0.0.1:9000/doctor/update/'+ this.name, this.data)
    .subscribe(responseData => {
      console.log(responseData);})
      this.detailMode = false;
    }
    console.log(this.editMode);
  }


  deleteDoctor(){
    alert("Are you sure you want to delete the account permanently?");
    this.http.delete('http://127.0.0.1:9000/doctor/delete/'+ this.name).subscribe(data =>{this.drr});
    this.router.navigate(['/doctor']);
  }

  showPassword(){
    this.Pass = !this.Pass;
    console.log(this.Pass)
  }
}

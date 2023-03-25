import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-paygate',
  templateUrl: './paygate.component.html',
  styleUrls: ['./paygate.component.css']
})
export class PaygateComponent {

  constructor(private router: Router,
    private route: ActivatedRoute){}

  onPay(form: NgForm ){
    if(form.valid){
    alert("Payment successful. Appointment is booked. Please check your appointments.");
    form.reset();
    console.log(form.value);
    this.router.navigate(['/user/appointments']);
    }
    
  }
}

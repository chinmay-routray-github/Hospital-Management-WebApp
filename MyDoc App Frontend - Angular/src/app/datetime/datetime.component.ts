import { Component } from '@angular/core';

@Component({
  selector: 'app-datetime',
  templateUrl: './datetime.component.html',
  styleUrls: ['./datetime.component.css']
})
export class DatetimeComponent {
  date = new Date()
  servicenumber = '0674-12345-6789';
}

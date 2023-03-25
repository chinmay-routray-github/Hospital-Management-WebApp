import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstPageComponent } from './first-page/first-page.component';
import { PatientLoginPageComponent } from './patient-login-page/patient-login-page.component'
import { DocLoginPageComponent } from './doc-login-page/doc-login-page.component'
import { NewPatientComponent } from './new-patient/new-patient.component'
import { FaqsComponent } from './faqs/faqs.component';
import { HomeComponent } from './home/home.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { AppointmentPageComponent } from './appointment-page/appointment-page.component';
import { BookingComponent } from './booking/booking.component';
import { PaygateComponent } from './paygate/paygate.component';
import { DochomeComponent } from './dochome/dochome.component';
import { DocbookingComponent } from './docbooking/docbooking.component';
import { ModifyBookingComponent } from './modify-booking/modify-booking.component';

const routes: Routes = [
  
  {path: '', component: FirstPageComponent, pathMatch: 'full'},
  {path: 'user', component: PatientLoginPageComponent},
  {path: 'doctor', component: DocLoginPageComponent},
  {path: 'newuser', component: NewPatientComponent },
  {path: 'user/home', component: HomeComponent },
  {path: 'user/mydocs', component: DoctorListComponent },
  {path: 'user/appointments', component: AppointmentPageComponent },
  {path: 'user/appointments/modify', component: ModifyBookingComponent },
  {path: 'user/faqs', component: FaqsComponent },
  {path: 'user/bookings', component: BookingComponent },
  {path: 'user/paygate', component: PaygateComponent },
  {path: 'doctor/home', component: DochomeComponent },
  {path: 'doctor/appointments', component: DocbookingComponent },
  {path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

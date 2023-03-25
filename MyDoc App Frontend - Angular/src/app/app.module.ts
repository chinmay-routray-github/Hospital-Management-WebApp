import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms' ;

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatetimeComponent } from './datetime/datetime.component';
import { FaqsComponent } from './faqs/faqs.component';
import { NewPatientComponent } from './new-patient/new-patient.component';
import { PatientLoginPageComponent } from './patient-login-page/patient-login-page.component';
import { DocLoginPageComponent } from './doc-login-page/doc-login-page.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { HeaderComponent } from './header/header.component';
import { PaygateComponent } from './paygate/paygate.component';
import { HomeComponent } from './home/home.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { AppointmentPageComponent } from './appointment-page/appointment-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BookingComponent } from './booking/booking.component';
import { DocheaderComponent } from './docheader/docheader.component';
import { DochomeComponent } from './dochome/dochome.component';
import { DocbookingComponent } from './docbooking/docbooking.component';
import { CustomInterceptor } from './custom.interceptor';
import { ModifyBookingComponent } from './modify-booking/modify-booking.component';

@NgModule({
  declarations: [
    AppComponent,
    DatetimeComponent,
    FaqsComponent,
    NewPatientComponent,
    PatientLoginPageComponent,
    DocLoginPageComponent,
    FirstPageComponent,
    HeaderComponent,
    PaygateComponent,
    HomeComponent,
    DoctorListComponent,
    AppointmentPageComponent,
    BookingComponent,
    DocheaderComponent,
    DochomeComponent,
    DocbookingComponent,
    ModifyBookingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{
    provide : HTTP_INTERCEPTORS, useClass: CustomInterceptor,
    multi: true
  },
    PatientLoginPageComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

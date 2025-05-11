import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddDepartmentComponent } from './AALA/department/add-department/add-department.component';
import { HrComponent } from './AALA/modules/hr/hr.component';
import { HomeComponent } from './temp/home/home.component';
//import { EmployeComponent } from './AALA/employee/employe/employe.component';
import { LoginComponent } from './AALA/employee/login/login.component';
import { DashboardComponent } from './AALA/employee/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { VerifierPresenceComponent } from './AALA/employee/verifier-presence/verifier-presence.component';
import { MatCardModule } from '@angular/material/card';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
//import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeListModule } from './AALA/modules/hr/employee-list-component/employee-list/employee-list.module';
import { MatDialogModule } from '@angular/material/dialog';
import { EmployeeListComponentComponent } from './AALA/modules/hr/employee-list-component/employee-list-component.component';
import { PresenceComponent } from './AALA/modules/hr/presence/presence.component';
//import { AddDepartmentComponent } from './AALA/department/add-department/add-department.component';
@NgModule({
  declarations: [
   
   // HrComponent,
    AppComponent,
  // EmployeComponent,
   LoginComponent,
   DashboardComponent,
   //EmployeeListComponentComponent,
   //VerifierPresenceComponent,
   AddDepartmentComponent,
   //ReactiveFormsModule,
   PresenceComponent,
   VerifierPresenceComponent,
  ],
  imports: [
    EmployeeListModule,
    MatCardModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  newDepartmentName: string = '';
 }

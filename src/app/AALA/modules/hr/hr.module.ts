import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { HrComponent } from './hr.component';
import { EmployeeService } from '../../service/employee.service';
import { DepartmentService } from '../../service/department.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';


import { HrRoutingModule } from './hr-routing.module';

import { PresenceComponent } from './presence/presence.component';

@NgModule({
  declarations: [
    //AddEmployeesComponent,
    HrComponent,
    //PresenceComponent
    
    
  ],
  imports: [
    CommonModule,
    HrRoutingModule,
    HrRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule

  ], 
  providers: [ EmployeeService, DepartmentService ]

  
})
export class HrModule { }

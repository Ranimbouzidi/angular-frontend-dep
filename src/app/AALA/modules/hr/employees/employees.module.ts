import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeesComponent } from '../../../modules/hr/employees/add-employees/add-employees.component';
import { EmployeeService } from '../../../service/employee.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EmployeesRoutingModule } from './employees-routing.module';
import { HrComponent } from '../hr.component';

@NgModule({
  declarations: [
    
    
    AddEmployeesComponent,
    //TopPerformersComponent,
],
  imports: [
      
      EmployeesRoutingModule,
      CommonModule,
    
      HttpClientModule,
      ReactiveFormsModule,
      FormsModule
    ],
    providers: [EmployeeService]
   
  })
  export class EmployeesModule {
    
   }

  export interface EmployeesModule {
    id?: number;
    fName: string;
    lName: string;
    email: string;
    idDep: number;
    role: string;
    salary: number;
    
  }
  
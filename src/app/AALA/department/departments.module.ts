import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],//AddDepartmentComponent],
  imports: [
    CommonModule,
    //FormsModule,
    DepartmentsRoutingModule
  ]
})
export class DepartmentsModule { }

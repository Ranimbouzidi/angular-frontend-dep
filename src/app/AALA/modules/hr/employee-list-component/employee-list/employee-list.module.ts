import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponentComponent } from '../../employee-list-component/employee-list-component.component';
import { EmployeeListRoutingModule } from './employee-list-routing.module';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    EmployeeListComponentComponent
  ],
  imports: [
    CommonModule,
    EmployeeListRoutingModule,
    FormsModule
  ]
})
export class EmployeeListModule { }

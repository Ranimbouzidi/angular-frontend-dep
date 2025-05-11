import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeesComponent } from './AALA/modules/hr/employees/add-employees/add-employees.component';
//import { AddEmployeesComponent } from 'C:/Users/pc/Desktop/aalaPI/personalapp/aalaapp/src/app/AALA/modules/hr/employees/add-employees/add-employees.component';
import { AddDepartmentComponent } from './AALA/department/add-department/add-department.component';
import { LoginComponent } from './AALA/employee/login/login.component';
import { DashboardComponent } from './AALA/employee/dashboard/dashboard.component';
import { PresenceComponent } from './AALA/modules/hr/presence/presence.component';

import { VerifierPresenceComponent } from './AALA/employee/verifier-presence/verifier-presence.component';
import { EmployeeListComponentComponent } from './AALA/modules/hr/employee-list-component/employee-list-component.component';
const routes: Routes = [
  { path: 'hr', loadChildren: () => import('./AALA/modules/hr/hr.module').then(m => m.HrModule) },
  //{ path: 'home', loadChildren: () => import('C:/Users/pc/Desktop/aalaPI/personalapp/aalaapp/src/app/temp/home/home/home.module').then(m => m.HomeModule) },
  {path: 'addEmployees', component: AddEmployeesComponent},
  {path: 'AddDepartment', component: AddDepartmentComponent },
  { path: 'Presence', component: PresenceComponent },
  //{ path: '', component: LoginComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  //{ path: 'verifier-presence', loadChildren: () => import('./AALA/employee/verifier-presence/verifier-presence.module').then(m => m.VerifierPresenceModule) },
  { path: 'verifier-presence/:id', component: VerifierPresenceComponent },

  { path: 'employee-list-component', component: EmployeeListComponentComponent },
  
  //{  path: '', redirectTo: '/home', pathMatch: 'full' },
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

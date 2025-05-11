import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'C:/Users/pc/Desktop/aalaPI/personalapp/aalaapp/src/app/temp/home/home.component';
const routes: Routes = [
   { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

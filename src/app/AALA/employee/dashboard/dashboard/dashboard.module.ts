import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from '../dashboard.component';
import { MatDialogModule } from '@angular/material/dialog'; // si tu utilises Material


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatDialogModule
  ]
})
export class DashboardModule { }

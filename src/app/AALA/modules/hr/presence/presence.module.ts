import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PresenceRoutingModule } from './presence-routing.module';
import { PresenceComponent } from './presence.component';


@NgModule({
  declarations: [
    
   // PresenceComponent
  ],
  imports: [
    CommonModule,
    PresenceRoutingModule,
    FormsModule
  ]
})
export class PresenceModule { }

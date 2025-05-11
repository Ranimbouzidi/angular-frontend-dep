import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VerifierPresenceRoutingModule } from './verifier-presence-routing.module';
import { VerifierPresenceComponent } from './verifier-presence.component';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  declarations: [
    //VerifierPresenceComponent
    ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    VerifierPresenceRoutingModule
  ]
})
export class VerifierPresenceModule { }

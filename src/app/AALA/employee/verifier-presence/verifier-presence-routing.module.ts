import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifierPresenceComponent } from './verifier-presence.component';

const routes: Routes = [
  { path: ':id', component: VerifierPresenceComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerifierPresenceRoutingModule { }

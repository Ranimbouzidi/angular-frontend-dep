import { Component , OnInit , OnDestroy, NgZone } from '@angular/core';
import { EmployeeService } from '../../service/employee.service';
//import {employee } from 'C:/Users/pc/Desktop/aalaPI/personalapp/aalaapp/src/app/AALA/modules/hr/employees.service'
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { VerifierPresenceComponent } from '../verifier-presence/verifier-presence.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  employe: any;
  intervalId: any;
  codeDeVerificationDisponible: boolean = true;
  tempsRestant: number = 30;
  verificationTimeout: any;
  verificationInterval: any;
  employeeId!: number;
  codeActuel!: string;
  intervalSub?: Subscription;

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog ,
    private router: Router,
    private http: HttpClient,
    private ngZone: NgZone
  ) {}
/*
  ngOnInit() {
    setInterval(() => {
      this.employeeService.checkVerification(this.employeeId).subscribe((needsVerification) => {
        if (needsVerification) {
          this.ngZone.run(() => {
            this.router.navigate(['/verifier-presence', this.employeeId]);
          });
        }
      });
    }, 60 * 1000); // toutes les minutes
  }
  */
  ngOnInit() {
    //const storedEmployeeId = localStorage.getItem('employeeId');
    const employeeData = localStorage.getItem('employee'); // <-- il faut récupérer 'employee'
    if (employeeData) {
      const employee = JSON.parse(employeeData);             // CHANGEMENT ici
      this.employeeId = employee.id;                         // CHANGEMENT ici
      console.log('employeeId récupéré:', this.employeeId);   // (facultatif mais utile)
    } else {
      console.error('employee non trouvé dans le localStorage');
      // Tu peux rediriger vers login ici si tu veux
      // this.router.navigate(['/login']);
    }
  
    /*if (storedEmployeeId) {
      this.employeeId = Number(storedEmployeeId);
    } else {
      console.error('employeeId non trouvé dans le localStorage');
      // Tu peux rediriger vers une page de login par exemple ici
    }*/

    this.intervalSub = interval(60000)
      .pipe(
        switchMap(() => this.employeeService.checkVerification(this.employeeId))
      )
      .subscribe((needsVerification) => {
        if (needsVerification) {
          this.ngZone.run(() => {
            this.router.navigate(['/verifier-presence', this.employeeId]);
          });
        }
      });
  }
  
  

}

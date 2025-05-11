import { Component, Inject, OnDestroy, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../service/employee.service';
import Swal from 'sweetalert2';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { interval, Subscription } from 'rxjs';
@Component({
  selector: 'app-verifier-presence',
  templateUrl: './verifier-presence.component.html',
  styleUrls: ['./verifier-presence.component.css']
})
export class VerifierPresenceComponent implements OnInit, OnDestroy {
  //verifForm: FormGroup;
  idEmploye!: number;
  employee: any = {};
  message = '';
  //employeeId!: number;
  employeeId!: number;
  code : string = '';
  private presenceCheckSubscription!: Subscription;

  constructor(private employeeService: EmployeeService, private router: Router) {}



  ngOnInit(): void {
    // Lancer un intervalle toutes les 5 secondes pour vérifier l'état
    /*this.presenceCheckSubscription = interval(2 * 60 * 1000).subscribe(() => {
      this.employeeService.getEmployeeById(this.employeeId).subscribe(employee => {
        if (employee.besoin_verification === 0 || employee.code_verification == null) {
          this.router.navigate(['']); // Redirige automatiquement vers login
        }
      });
    });*/
/*
    this.employeeService.getEmployeeById(this.employeeId).subscribe({
      next: (employee) => {
        console.log('Données récupérées immédiatement :', employee);
        this.employee = employee;
  
        // Vérification immédiate dès le début
        if (employee.besoinVerification === false || employee.codeVerification == null) {
          this.router.navigate(['/Login']);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération initiale', err);
      }
    });
  */

    const employeeData = localStorage.getItem('employee');
  
    // Si des données d'employé existent dans le localStorage
    if (employeeData) {
      const employee = JSON.parse(employeeData);
      this.employeeId = employee.id;  // Assigner l'ID de l'employé récupéré
      
  
      // Récupérer les données de l'employé avec l'ID
      this.employeeService.getEmployeeById(this.employeeId).subscribe({
        next: (employee) => {
          console.log('Données récupérées immédiatement :', employee);
          this.employee = employee;
    
         
        },
        
      });
    } 





    this.presenceCheckSubscription = interval(2 * 60 * 1000).subscribe(() => {
      this.employeeService.getEmployeeById(this.employeeId).subscribe({
        next: (employee) => {
          console.log(employee);
          this.employee = employee;
          if (employee.besoin_verification === 0 || employee.code_verification == null) {
            this.router.navigate(['/Login']); // Redirige vers login si besoin de vérification terminé
          }
        },
        error: (err) => {
          console.error('Erreur durant la vérification automatique', err);
        }
      });
    });
  }

  
  

  ngOnDestroy(): void {
    // On évite les fuites mémoire
    if (this.presenceCheckSubscription) {
      this.presenceCheckSubscription.unsubscribe();
    }
  }



  valider() {
  

    this.employeeService.verifierCode(this.employeeId, this.code).subscribe({
      next: () => {
        Swal.fire('Succès', 'Code accepté ✅', 'success');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        Swal.fire('Erreur', err.error.message || 'Code invalide ❌', 'error');
        this.router.navigate(['/Login']);
      }
    });
  }
  /*

  
   constructor(
    private dialogRef: MatDialogRef<VerifierPresenceComponent>,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {}

  
  valider() {
    this.employeeService.verifierCode(this.employeeId, this.code).subscribe({
      next: () => {
        Swal.fire('Succès', 'Code accepté ✅', 'success');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        Swal.fire('Erreur', err.error.message || 'Code invalide ❌', 'error');
      }
    });
  }*/
  
  /*

 
  ngOnInit(): void {
    this.employeeId = +this.route.snapshot.paramMap.get('id')!;
  }

  



  /*ngOnInit(): void {
    if (this.data.besoin_verification === 1) {
      this.submit(); // Lance automatiquement le popup pour entrer le code
    }
  }*/
  

 /* valider() {
    this.employeeService.verifierCode(this.data.id, this.code).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '✅ Succès',
          html: `<p>Code vérifié avec succès !</p><p><strong>Code utilisé :</strong> <code>${this.code}</code></p>`,
          showConfirmButton: true,
          confirmButtonText: 'Fermer',
          didOpen: () => {
            const codeElem = Swal.getHtmlContainer()?.querySelector('code');
            if (codeElem) {
              const range = document.createRange();
              range.selectNode(codeElem);
              window.getSelection()?.removeAllRanges();
              window.getSelection()?.addRange(range);
            }
          }
        });
        this.dialogRef.close();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: '❌ Erreur',
          html: `<p>${err.error.message || 'Code incorrect.'}</p><p><strong>Code saisi :</strong> <code>${this.code}</code></p>`,
          confirmButtonText: 'Réessayer'
        });
      }
    });
  }
  
  

  submit() {
    Swal.fire({
      title: 'Vérification de présence',
      input: 'text',
      inputLabel: 'Veuillez entrer le code reçu',
      inputPlaceholder: 'Code de vérification',
      showCancelButton: true,
      confirmButtonText: 'Valider',
      cancelButtonText: 'Annuler',
      inputValidator: (value) => {
        if (!value) {
          return 'Tu dois entrer un code !';
        }
        return null;
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const codeSaisi = result.value;
        this.employeeService.verifierCode(this.data.id, codeSaisi).subscribe({
          next: () => {
            Swal.fire('Succès', 'Code accepté ✅', 'success');
            this.dialogRef.close();
          },
          error: (err) => {
            Swal.fire('Erreur', err.error.message || 'Code invalide ❌', 'error');
          }
        });
      }
    });
  }*/
  
/*
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: EmployeeService
  ) {
    this.verifForm = this.fb.group({
      code: ['']
    });
    

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.idEmploye = +params['idEmploye'];
    });
  }

  submit(): void {
    const employee = JSON.parse(localStorage.getItem('employee')!);
    if (!employee) {
      alert("Aucun utilisateur connecté.");
      return;
    }

    const payload = {
      idEmploye: employee.id,
      code: this.verifForm.value.code
    };

    this.service.verifierPresence(payload).subscribe({
      next: () => {
        alert('✅ Code accepté');
        this.router.navigate(['/dashboard']);
      },
      error: () => alert('❌ Code invalide')
    });
  }
  validerCode() {
    const saisie = this.verifForm.value.code;
    if (saisie == this.employee.code_verification) {
      this.message = 'Code vérifié avec succès !';
      this.router.navigate(['/dashboard']);
    } else {
      this.message = 'Code incorrect. Réessaie.';
    }
  }*/

}

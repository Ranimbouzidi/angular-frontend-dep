import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { EmployeService } from '../../services/employe.service';
import { EmployeeService } from '../../service/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: EmployeeService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['',Validators.required],
      motDePasse: ['']
    });
  }

  /*login() {
    this.service.login(this.loginForm.value).subscribe({
      next: (emp) => {
        console.log("Connexion réussie",emp); 
         console.log("Connexion réussie emp:", emp);    // <-- Ajoute ce console.log clair
        console.log("emp JSON.stringify:", JSON.stringify(emp)); 
        localStorage.setItem('employee', JSON.stringify(emp));
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error("Erreur de login", err);
        alert('Identifiants invalides');
      }
    });
  }
*/
login() {
  this.service.login(this.loginForm.value).subscribe({
    next: (response) => {
      console.log("Connexion réussie response:", response);

      // Vérifier si la réponse est un objet contenant les informations de l'employé
      if (response && response.id && response.fName) {
        const employeeData = {
          id: response.id,
          nom: response.fName  // Vous pouvez aussi adapter selon les besoins
        };

        // Stocker les données réelles de l'employé dans localStorage
        localStorage.setItem('employee', JSON.stringify(employeeData));

        // Rediriger vers le dashboard après la connexion
        this.router.navigate(['/dashboard']);
      } else {
        alert('Données de connexion invalides');
      }
    },
    
  });
}



}

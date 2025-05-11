import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../../../../service/employee.service';
import { DepartmentService } from '../../../../service/department.service';
import { EmployeesModule } from '../employees.module';

@Component({
  selector: 'app-add-employees',
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.css']
})
export class AddEmployeesComponent implements OnInit {
  employeeForm: FormGroup;
 
  employees: EmployeesModule[] = [];
  departments: any[] = [];

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private departmentService: DepartmentService ) {
    this.employeeForm = this.fb.group({
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      idDep: ['', Validators.required],
      role: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
      motDePasse: [''],
    
    });
  }
  ngOnInit(): void {
    this.loadEmployees();
    this.loadDepartments();
    
  }
  loadDepartments(): void {
    this.departmentService.getAllDepartments().subscribe({
      next: (data) => this.departments = data,
      error: (err) => console.error('Erreur chargement départements:', err)
    });
  }

  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        console.log('Données récupérées des employés :', data);
        this.employees = data;
      },
      
    });
  }




  onSubmit(): void {
    if (this.employeeForm.valid) {
      //const employee: EmployeesModule = this.employeeForm.value;
      const newEmail = this.employeeForm.value.email.trim().toLowerCase();

      // Vérification si l'e-mail existe déjà
      const emailExists = this.employees.some(
        emp => emp.email.trim().toLowerCase() === newEmail
      );
  
      if (emailExists) {
        alert('Un employé avec cet e-mail existe déjà.');
        return;
      }
  



      const employee: any = {
        fName: this.employeeForm.value.fName,
        lName: this.employeeForm.value.lName,
       /* department: {
          id: this.employeeForm.value.department
        },*/
        idDep:this.employeeForm.value.idDep,
        email:this.employeeForm.value.email,
        role:this.employeeForm.value.role,
        salary:this.employeeForm.value.salary,
        motDePasse:this.employeeForm.value.salary,

      };
      this.employeeService.addEmployee(employee).subscribe({
        next: (res) => {
          alert('Employé ajouté avec succès');
          this.employeeForm.reset();
          //window.location.reload();
        },
        error: (err) => {
          console.error(err);
          alert("Erreur lors de l'ajout");
        }
      });
    }
  }







 /* onUpdate(): void {
    const index = this.employees.findIndex(emp =>
      emp.fName.toLowerCase() === this.targetFName.toLowerCase() &&
      emp.lName.toLowerCase() === this.targetLName.toLowerCase()
    );

    if (index !== -1) {
      const updatedEmployee = { ...this.employees[index], ...this.employeeForm.value };
      this.employeeService.updateEmployee(updatedEmployee).subscribe({
        next: () => {
          alert('Employé modifié avec succès');
          
        },
        error: (err) => {
          console.error(err);
          alert("Erreur lors de la modification");
        }
      });
    } else {
      alert('Employé non trouvé');
    }
  }*/
 
    onUpdate(): void {
      //console.log('Cible prénom :', this.targetFName, 'Cible nom :', this.targetLName); // Vérifie la valeur des cibles
      const fName = this.employeeForm.get('fName')?.value?.toLowerCase();
      const lName = this.employeeForm.get('lName')?.value?.toLowerCase();
      
      const employee = this.employees.find(emp =>
        emp.fName.toLowerCase() ===  fName &&
        emp.lName.toLowerCase() === lName
      );
      //console.log('Employé trouvé pour modification :', employee); // Log l'employé
     
      if  (employee && employee.id) {
        const id = employee.id; // garder l'id pour l'URL
        const updatedData: Partial<EmployeesModule> = {
          email: this.employeeForm.value.email,
          role: this.employeeForm.value.role,
          salary: this.employeeForm.value.salary
        };
        alert('Employé modifié avec succès');
    
    this.employeeService.updateEmployee(id, updatedData).subscribe({
      next: () => {
        alert('Employé modifié avec succès');
        this.loadEmployees();
        this.employeeForm.reset();
      },
     /* error: (err) => {
        console.error(err);
        alert("Erreur lors de la modification");
      }*/
    });
  } else {
    alert('Employé non trouvé avec le prénom et nom fournis');
  }

 }







    onDelete(): void {
      const fName = this.employeeForm.get('fName')?.value?.toLowerCase();
      const lName = this.employeeForm.get('lName')?.value?.toLowerCase();

      const employee = this.employees.find(emp =>
        emp.fName.toLowerCase() === fName &&
        emp.lName.toLowerCase() === lName);
    
      if (employee) {
        // Vérifier si un ID existe pour l'employé
        const employeeId = employee.id;
        if (employeeId) {
          this.employeeService.deleteEmployee(employeeId).subscribe({
            next: () => {
              alert('Employé supprimé avec succès');
              this.loadEmployees(); // Recharger la liste après suppression
            },
            error: (err) => {
              console.error(err);
              alert("Erreur lors de la suppression");
            }
          });
        } else {
          alert('ID d\'employé manquant');
        }
      } else {
        alert('Employé non trouvé avec le prénom et nom fournis');
      }
    }
    
  


}



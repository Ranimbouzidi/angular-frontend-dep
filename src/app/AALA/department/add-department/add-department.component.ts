import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DepartmentService } from '../../service/department.service';
 



@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent {

  newDepartmentName: string = '';
  updatedName: string = '';
  departmentId: number  = 0; 
  departments: any[] = [];
  constructor(private departmentService: DepartmentService) {}
 
 
  ngOnInit(): void { // Charge les départements au début
      this.loadDepartments();
    }


    loadDepartments(): void {
      this.departmentService.getAllDepartments().subscribe({
        next: (data) => {
          this.departments = data;
        },
        error: (err) => {
          console.error('Error loading departments:', err);
        }
      });
    }
    
  // Créer un département
  createDepartment(): void {
    if (!this.newDepartmentName) {
      alert("Please provide a department name.");
      return;
    }

    this.departmentService.getAllDepartments().subscribe({
      next: (data) => {
      const trimmedName = this.newDepartmentName.trim().toLowerCase();
    const nameExists = this.departments.some(
      dept => dept.name.trim().toLowerCase() === this.newDepartmentName.trim().toLowerCase()
    );
  
    if (nameExists) {
      alert("A department with this name already exists.");
      return;
    }

    const newDepartment = {
      name: this.newDepartmentName
    };

   

    this.departmentService.postDepartments(newDepartment).subscribe({
      next: () => {
        alert('Department created successfully!');
        this.newDepartmentName = ''; // Clear the input after success
        this.loadDepartments();
      },
      error: (err) => {
        console.error('Error creating department:', err);
        alert('Failed to create department.');
      }
    });
  }})}

  // Modifier un département
  editDepartment(): void {
    if (!this.updatedName || !this.departmentId) {
      alert("Please provide both the new department name and ID.");
      return;
    }

    const updatedDepartment = {
      id: this.departmentId,
      name: this.updatedName
    };
    //alert('Department updated successfully!');
    this.departmentService.updateDepartment(this.departmentId, this.updatedName).subscribe({
      next: () => {
        alert('Department updated successfully!');
        this.updatedName = ''; // Clear the input after success
      },
      error: (err) => {
        console.error('Error updating department:', err);
        alert('Failed to update department.');
      }
    });
  }

  // Supprimer un département
  deleteDepartment(): void {
    if (!this.departmentId) {
      alert("Please provide a department ID to delete.");
      return;
    }

    this.departmentService.deleteDepartment(this.departmentId).subscribe({
      next: () => {
        alert('Department deleted successfully!');
        },
      error: (err) => {
        console.error('Error deleting department:', err);
        alert('Failed to delete department.');
      }
    });
  }

}

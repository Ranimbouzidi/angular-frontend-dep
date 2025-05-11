import { Component, OnInit } from '@angular/core';
//import { EmployeeService } from 'src/app/AALA/service/employee.service';
import { DepartmentService } from 'src/app/AALA/service/department.service';
import { EmployeeService } from 'src/app/AALA/service/employee.service';
@Component({
  selector: 'app-employee-list-component',
  templateUrl: './employee-list-component.component.html',
  styleUrls: ['./employee-list-component.component.css']
})
export class EmployeeListComponentComponent implements OnInit{

  employees: any[] = [];
  searchTerm: string = '';
  filteredEmployee: any = null;
  departments: any[] = [];
  employeesPerPage: number = 10;  // Items per page
  currentPage: number = 1;  // Current page
  totalEmployees: number = 0;  // Total number of employees
  totalPages: number = 0;  // Total number of pages
  allEmployees: any[] = [];
  pageSize: number = 10; // You can adjust this value based on your requirements
  

  constructor(private employeeService: EmployeeService ,
    private departmentService: DepartmentService) {}
    departmentsMap: Map<number, string> = new Map();

  ngOnInit(): void {
    this.getEmployees();
    this.getAllDepartments();
    
  }
  getAllDepartments(): void {
    this.departmentService.getAllDepartments().subscribe({
      next: (departments) => {
        departments.forEach((dept: any) => {
          this.departmentsMap.set(dept.id, dept.name);
        });
        console.log('Départements chargés:', this.departmentsMap);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des départements', err);
      }
    });
  }






  getEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (data: any[]) => {
        this.allEmployees = data;  // Store all employees
        this.totalEmployees = this.allEmployees.length;
        this.totalPages = Math.ceil(this.totalEmployees / this.employeesPerPage);

        // Slice the array based on current page and employees per page
        const offset = (this.currentPage - 1) * this.employeesPerPage;
        this.employees = this.allEmployees.slice(offset, offset + this.employeesPerPage);

        console.log('Employés récupérés:', data);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des employés', err);
      }
    });
  }

  // Method to navigate to the next page
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getEmployees();  // Reload employees for the new page
    }
  }

  // Method to navigate to the previous page
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getEmployees();  // Reload employees for the new page
    }
  }

/*
  getEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        console.log('Employés récupérés :', data);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des employés', err);
      }
    });
  }*/
  onSearch(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredEmployee = this.employees.find(emp =>
      `${emp.fName} ${emp.lName}`.toLowerCase().includes(term)
    );
  }

  getDepartmentName(idDep: number): string {
    return this.departmentsMap.get(idDep) || 'Département inconnu';
  }
  
  /*
  getDepartmentName(idDep: number): void {
    this.departmentService.getOneDepartment(idDep).subscribe({
      next: (department) => {
        const element = document.getElementById(`department-${idDep}`);
        if (element) {
          element.innerText = department.name;
        }
      },
      
    });
  }*/
  
    // Pagination handlers
    goToPage(page: number): void {
      if (page < 1 || page > this.totalPages) return;
      this.currentPage = page;
      this.getEmployees();
    }
  
   

}

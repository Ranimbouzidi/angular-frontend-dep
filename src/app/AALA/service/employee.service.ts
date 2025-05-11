import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
//import {environment} from'C:/Users/pc/Desktop/gestion-department-employees-crud-master/src/environments/environment';
import { Observable } from 'rxjs';
import { EmployeesModule } from '../modules/hr/employees/employees.module';
import { environment } from 'src/environments/environment';

export interface PresenceDto {
  nom: string;
  prenom: string;
  date: string;
  heureArrivee: string;
  statut: string;
}
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {  
  private apiUrl = 'http://localhost:8081/api'; 
   constructor(private http: HttpClient) { }

  addEmployee(employee: EmployeesModule): Observable<EmployeesModule> {
    return this.http.post<EmployeesModule>(`${this.apiUrl}/employees`, employee);
  }
  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data ,{
      responseType: 'json' // important si backend retourne juste un String
    });
  }

  
  logout(idEmploye: number): Observable<any> {
  return this.http.post(`/api/logout?idEmploye=${idEmploye}`, {});
  }

  getPresencesByDate(date: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/presences/jour/${date}`);
  }

  getEmployeeById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/employees/${id}`);
  }
  /*verifierCode(idEmploye: number, code: string): Observable<any> {
    return this.http.post(`/api/verifier-presence?idEmploye=${idEmploye}&code=${code}`, {});
  }*/

  checkVerif(id: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/verif-check?idEmploye=${id}`);
  }

  verifierPresence(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/verifier-presence`, data);
  }
  getTopPerformers(n: number): Observable<any[]> {
    return this.http.get<any[]>(`/api/employees/top?topN=${n}`);
  }
  
  checkVerification(id: number) {
    return this.http.get<boolean>(`${this.apiUrl}/verif-check?idEmploye=${id}`);
  }

  verifierCode(id: number, code: string) {
    return this.http.post<any>(`${this.apiUrl}/verifier-presence`, null, {
      params: {
        idEmploye: id,
        code: code
      }
    });
  }
  
  getAllEmployees() {
    return this.http.get<any[]>(`${this.apiUrl}/employees`);
  }
  updateEmployee(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/employees/${id}`, data);

  }
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/d/${id}`);
  }
/*getEmployees(): Observable<any> {

  return this.httpClient.get<any>('${environment.apiUrl}/${environment.prefix}/employees')

}

postEmployees(data: any): Observable<any> {
  return this.httpClient.post<any>('${environment.apiUrl}/${environment.prefix}', data)
}
getEmployeeById(employeeId: number): Observable<any> {
return this.httpClient.get<any>('${environment.apiUrl}/${environment.prefix}/employees/by/${employeeId}');

}
getEmployeesByDepartment(departmentId: number): Observable<any> {

  return this.httpClient.get<any[]>('${environment.apiUrl}/${environment.prefix}/employees/{departmentId}');

}*/

}

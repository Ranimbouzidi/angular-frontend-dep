import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = 'http://localhost:8081/api';
  constructor(private httpClient: HttpClient) { }

  /*getListDepartments(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/${environment.prefix}/departments`)
  }*/

    updateDepartment(id: number, newName: string): Observable<any> {
      return this.httpClient.put<any>(`${this.apiUrl}/updateDepartment/${id}/${newName}`, { name: newName });
    }

  postDepartments(data: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/departments`, data);
  }

  getOneDepartment(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/departments/${id}`)
    
  }
  deleteDepartment(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
  
  getAllDepartments(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/departments`);
  }
}

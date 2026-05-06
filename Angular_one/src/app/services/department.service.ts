import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DepartmentModel } from '../model/department.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {

  private departmentUrl = environment.baseApi + 'department';

  constructor(private http: HttpClient) { }

  // Get All Request
  getAllDepartment(): Observable<DepartmentModel[]> {
    return this.http.get<DepartmentModel[]>(this.departmentUrl);
  }

  // Post Request
  saveDepartment(department: DepartmentModel): Observable<DepartmentModel> {
    return this.http.post<DepartmentModel>(this.departmentUrl, department);
  }

  // Put Request
  updateDepartment(department: DepartmentModel): Observable<DepartmentModel> {
    return this.http.put<DepartmentModel>(this.departmentUrl + '/' + department.id, department);
  }

  // Delete Request
  deleteDepartment(id: string): Observable<void> {
    return this.http.delete<void>(this.departmentUrl + '/' + id);
  }

  // Get By ID
  getByID(id: string): Observable<DepartmentModel> {
    return this.http.get<DepartmentModel>(this.departmentUrl + '/' + id);
  }

}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentModel } from '../model/student.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private baseApi: string = "http://localhost:3000/student";

  constructor(private http: HttpClient) { }

  // Get Request
  getAllStudents(): Observable<StudentModel[]> {
    return this.http.get<StudentModel[]>(this.baseApi);
  }

  //Post Request
  saveStudent(student: StudentModel) {
    return this.http.post<StudentModel>(this.baseApi, student);
  }

  //Put Request 
  updateStudent(student: StudentModel): Observable<StudentModel> {
    return this.http.put<StudentModel>(this.baseApi + '/' + student.id, student);
  }

  //Delete Request
  deleteStudent(id: string): Observable<void> {
    return this.http.delete<void>(this.baseApi + '/' + id);
  }

getByID(id: string): Observable<StudentModel>{

  return this.http.get<StudentModel>(this.baseApi +'/' +id);
}


}

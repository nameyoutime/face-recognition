import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {


  constructor(private http: HttpClient) { }
  async getStudent() {
    return this.http.get(`${environment.api}student/`)
  }
  getStudentBySId(id: any) {
    return this.http.get(`${environment.api}student/${id}`)
  }
  getStudentById(id: any) {
    return this.http.get(`${environment.api}student/id/${id}`)
  }

  addStudent(name: any, description: any) {
    return this.http.post(`${environment.api}student/`, {
      student: {
        fullName: name,
        description: description,
      }

    })
  }

  updateStudent(Id: any, name: any, description: any) {
    return this.http.put(`${environment.api}student${Id}`, {
      student: {
        fullName: name,
        description: description,
      }
    })
  }
  deleteStudentById(Id: any) {
    return this.http.delete(`${environment.api}student/${Id}`)
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }

  async getTeacherList() {
    return this.http.get(`${environment.api}teacher`)
  }
  addTeacher(name: any, userName: any, passWord: any, role: any) {
    return this.http.post(`${environment.api}teacher/`, {
      teacher: {
        userName: userName,
        password: passWord,
        fullName: name,
        role: role
      }

    })
  }
  getTeacherInfo(Id:any){
    return this.http.get(`${environment.api}teacher/${Id}`)
  }
  updateTeacher(teacherId: any, name: any, userName: any, passWord: any, role: any) {
    return this.http.put(`${environment.api}teacher/${teacherId}`, {
      teacher: {
        userName: userName,
        password: passWord,
        fullName: name,
        role: role
      }
    })
  }
  deleteTeacher(teacherId: any) {
    return this.http.delete(`${environment.api}teacher/${teacherId}`, {
    })
  }
}

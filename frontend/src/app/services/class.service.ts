import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  classList: any
  class: any
  constructor(public http: HttpClient) { }

  async getClass() {
     this.http.get(`${environment.api}class/`).subscribe((data) => {
      this.classList=data
      this.classList=this.classList?.data
    })



  }
   getClassById(Id: any) {
       return this.http.get(`${environment.api}class/${Id}`)

  }
  async createClass(students: Array<any>, title: any, description: any, teacher: any) {
    try {
      await this.http.post(`${environment.api}class/`, {
        students: students,
        title: title,
        description: description,
        teacher: teacher,
      })
    } catch (e) {
      alert("Lỗi");
    }

  }
  async updateClass(Id: any, students: Array<any>, title: any, description: any, teacher: any) {
    try {
      await this.http.put(`${environment.api}class/${Id}`, {
        students: students,
        title: title,
        description: description,
        teacher: teacher,
      })
    } catch (e) {
      alert("lỗi")
    }
  }
  async deleteClassById(Id: any) {
    try {
      await this.http.delete(`${environment.api}class/${Id}`).subscribe(() => {
        alert("Thành công")
      })
    } catch (e) {
      alert("lỗi")
    }
  }

}

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
      this.classList = data
      this.classList = this.classList?.data
    })
  }


  getClassById(Id: any) {
    return this.http.get(`${environment.api}class/${Id}`)

  }
  createClass(students: Array<any>, title: any, description: any, teacher: any) {
    return this.http.post(`${environment.api}class/`, {
      classes: {
        students: students,
        title: title,
        description: description,
        teacher: teacher,
      }
    })
  }
  updateClass(Id: any, students: Array<any>, title: any, description: any, teacher: any) {
    // console.log(`${environment.api}class/${Id}`)
    return this.http.put(`${environment.api}class/${Id}`, {
      students: students,
      title: title,
      description: description,
      teacher: teacher,
    })
  }
  async deleteClassById(Id: any) {
    return this.http.delete(`${environment.api}class/${Id}`)
  }
}

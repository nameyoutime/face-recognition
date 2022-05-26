import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http: HttpClient) { }
  createAttendance(classId: any, students: Array<any>) {
    let array: any = [];
    students.forEach((data) => {
      array.push({ student: data })
    })
    return this.http.post(`${environment.api}attendance`, {
      attendance: {
        students: students,
        arr: array,
        class: classId
      }
    })
  }
  getAttendanceByClass(classId:any){
    return this.http.get(`${environment.api}attendance/class/${classId}`)
  }
  getAttendance(Id: any) {
    return this.http.get(`${environment.api}attendance/id?id=${Id}`)
  }
}

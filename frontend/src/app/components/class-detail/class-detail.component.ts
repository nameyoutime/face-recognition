import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttendanceService } from 'src/app/services/attendance.service';
import { ClassService } from 'src/app/services/class.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.scss']
})
export class ClassDetailComponent implements OnInit {

  Id: any;
  classDetail: any;
  p: any;
  classStudentList: Array<any> = [];
  studentList: Array<any> = [];
  notExistStudentList: Array<any> = [];

  constructor(private classSv: ClassService, public acRoute: ActivatedRoute, private studentSv: StudentService, private attendSvc: AttendanceService) {
    this.acRoute.params.subscribe((param: any) => {
      this.Id = param?.id
      this.getClassDetail()
      this.getStudent()
    })
  }
  ngOnInit(): void {
  }
  async getStudent() {
    (await this.studentSv.getStudent()).subscribe((data: any) => {
      this.studentList = data.data
    })

  }
  async getClassDetail() {
    await this.classSv.getClassById(this.Id).subscribe((data: any) => {
      this.classDetail = data.data
      this.getClassStudentList(data.data.students)
    })
  }
  async getClassStudentList(studentArray: Array<any>) {
    studentArray.forEach(async (student) => {
      await this.studentSv.getStudentById(student).subscribe((data: any) => {
        this.classStudentList.push(data.result);
      })
    })
  }
  async updateClass() {

  }
  async createAttendance() {
    await this.attendSvc.createAttendance(this.Id, this.studentList).subscribe((data: any) => {
      console.log(data)
    })
  }


}

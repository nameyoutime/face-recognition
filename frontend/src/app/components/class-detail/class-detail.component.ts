import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  ap:any;
  classStudentList: Array<any> = [];
  studentList: Array<any> = [];
  notExistStudentList: Array<any> = [];
  attendanceList: Array<any> = [];

  constructor(private classSv: ClassService, public acRoute: ActivatedRoute, private studentSv: StudentService, private attendSvc: AttendanceService, private route:Router) {
    this.acRoute.params.subscribe((param: any) => {
      this.Id = param?.id
      this.getClassDetail();
      this.getStudent();
      this.getAllAttendance();
    });
  }
  ngOnInit(): void {
  }
  async getStudent() {
    (await this.studentSv.getStudent()).subscribe((data: any) => {
      this.studentList = data.data;
    });

  }
  async getClassDetail() {
    await this.classSv.getClassById(this.Id).subscribe((data: any) => {
      // console.log(data);
      this.classDetail = data.data;
      this.getClassStudentList(data.data.students);
    });
  }
   getClassStudentList(studentArray: Array<any>) {
    this.classStudentList = studentArray;
  }
  async updateClass() {

  }
  async createAttendance() {
    await this.attendSvc.createAttendance(this.Id, this.studentList).subscribe((data: any) => {
      console.log(data);
    });
  }
  async getAllAttendance() {
    await this.attendSvc.getAttendanceByClass(this.Id).subscribe((data: any) => {
      console.log(data)
      this.attendanceList=data.data
    });
  }
  getAttendance(Id: any) {

    this.route.navigate(["table/attendance/", Id]);
  }

}

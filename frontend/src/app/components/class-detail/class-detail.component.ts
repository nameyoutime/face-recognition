import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AttendanceService } from 'src/app/services/attendance.service';
import { ClassService } from 'src/app/services/class.service';
import { StudentService } from 'src/app/services/student.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.scss']
})
export class ClassDetailComponent implements OnInit {

  Id: any;
  classDetail: any = {};
  updateClassForm: FormGroup;
  teacher:any;
  p: any;
  ap: any;
  classStudentList: Array<any> = [];
  studentList: Array<any> = [];
  notExistStudentList: Array<any> = [];
  attendanceList: Array<any> = [];
  temp:any = 'a';
  constructor(private classSv: ClassService, public acRoute: ActivatedRoute, private studentSv: StudentService, private attendSvc: AttendanceService, private route: Router,private teacherSv:TeacherService) {
    this.acRoute.params.subscribe((param: any) => {
      this.Id = param?.id
      this.getClassDetail();
      this.getStudent();
      this.getAllAttendance();
      this.getTeacher();
    });
    this.updateClassForm = new FormGroup({
      classTitle: new FormControl(''),
      classDescription: new FormControl('', [Validators.required]),
      classTeacher: new FormControl('a', [Validators.required]),
    })
  }
  ngOnInit(): void {
    

  }

  async getTeacher(){
    (await this.teacherSv.getTeacherList()).subscribe((res:any)=>{
      for (let i = 0; i < res.data.length; i++) {
        if(res.data[i].role=="admin"){
          res.data.splice(i,1);
        }
      }
      this.teacher = res.data;

    })

  }
  async getStudent() {
    (await this.studentSv.getStudent()).subscribe((data: any) => {
      this.studentList = data.data;
    });

  }
  async addStudent(){
    let temp = [];
    for (let i = 0; i < this.classDetail.students.length; i++) {
      temp.push(this.classDetail.students[i]._id);
    }
    this.studentList.forEach(val => {
      if(val.checked){
        let index = this.classDetail.students.findIndex((v:any) => v._id == val._id);
        if(index==-1){
          temp.push(val._id)
        }
      }
    });
    await this.classSv.updateClass(this.classDetail._id,temp,this.classDetail.title,this.classDetail.description,this.classDetail.teacher).subscribe((res:any)=>{
      if(!res.error){
        this.getClassDetail();
      }
    });
  }
  async removeStudents(index:any){
    this.classDetail.students.splice(index,1);
    await this.classSv.updateClass(this.classDetail._id,this.classDetail.students,this.classDetail.title,this.classDetail.description,this.classDetail.teacher).subscribe((res:any)=>{
      if(!res.error){
        this.getClassDetail();
      }
    });
  }
  async getClassDetail() {
    await this.classSv.getClassById(this.Id).subscribe((data: any) => {
      this.classDetail = data.data;
      console.log(this.classDetail)
      this.getClassStudentList(data.data.students);
    });
  }
  getClassStudentList(studentArray: Array<any>) {
    this.classStudentList = studentArray;
  }
  async deleteAttendance(id:any) {
    
    await this.attendSvc.deleteAttendance(id).subscribe((res:any)=>{
      if(!res.error){
        this.getAllAttendance();
      }
    })
  }
  async updateClass(){
    
  }
  async createAttendance() {
    await this.attendSvc.createAttendance(this.Id, this.classStudentList).subscribe((data: any) => {
      try {
        if (data.data == 'already create on this day') {
          throw new Error(data.data);
        }
        else {
          alert("Create Attendance Completed")
          this.getAllAttendance();
        }
      } catch (err) {
        alert(err)
      }
    });
  }
  async getAllAttendance() {
    await this.attendSvc.getAttendanceByClass(this.Id).subscribe((data: any) => {
      this.attendanceList = data.data
    });
  }
  getAttendance(Id: any) {

    this.route.navigate(["table/attendance/", Id]);
  }

}

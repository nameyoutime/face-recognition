import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ClassService } from 'src/app/services/class.service';
import { StudentService } from 'src/app/services/student.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.scss']
})
export class CreateClassComponent implements OnInit {
  studentList: any;
  teacherList: any;
  createClassForm: FormGroup;
  p: any
  constructor(private studentSv: StudentService, private teacherSv: TeacherService, private form: FormBuilder, private classSv: ClassService,private route:Router) {
    this.getStudent()
    this.getTeacher()
    this.createClassForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      teacher: new FormControl('', [Validators.required]),

    })
  }

  ngOnInit(): void {
  }
  async getStudent() {
    (await this.studentSv.getStudent()).subscribe((data: any) => {
      this.studentList = data.data
      for (let i = 0; i < this.studentList.length; i++) {
        this.studentList[i].checked = false;
        // console.log(this.studentList[i])
      }
    })

  }
  async getTeacher() {
    (await this.teacherSv.getTeacherList()).subscribe((data: any) => {
      this.teacherList = data.data;
      this.teacherList = this.teacherList.filter((x: any) => x.role != "admin")
    })

  }
  async createClass() {
    if (!this.createClassForm.valid) {
      alert("Please enter all required fields")
    }
    else {
      let fvalue = this.createClassForm.controls;
      let choosedStudent = await this.studentList.filter((x: any) => x.checked == true)
      let listSid: Array<any> = [];
      await choosedStudent.map((student: any) => {
        listSid.push(student._id)

      })

      if (listSid.length != 0) {
        this.classSv.createClass(listSid, fvalue['title'].value, fvalue['description'].value, fvalue['teacher'].value).subscribe()
        this.route.navigate(['table/class'])
      }
      else {
        this.classSv.createClass([], fvalue['title'].value, fvalue['description'].value, fvalue['teacher'].value).subscribe()
        this.route.navigate(['table/class'])
      }

    }

  }

}

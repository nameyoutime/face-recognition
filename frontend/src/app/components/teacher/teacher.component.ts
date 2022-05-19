import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {
  updateTeacherForm: FormGroup
  addTeacherForm: FormGroup
  teacherList: Array<any> = [];
  teacherInfo: any;
  p: any;
  Role: any = "teacher"
  constructor(public teacherSv: TeacherService, public fb: FormBuilder) {
    this.getTeacher()

    this.updateTeacherForm = new FormGroup({
      teacherId: new FormControl('', [Validators.required]),
      teacherUserName: new FormControl('', [Validators.required]),
      teacherPassWord: new FormControl('', [Validators.required]),
      teacherName: new FormControl('', [Validators.required]),
      teacherRole: new FormControl('', [Validators.required]),
    })
    this.addTeacherForm = new FormGroup({
      teacherUserName: new FormControl('', [Validators.required]),
      teacherPassWord: new FormControl('', [Validators.required]),
      teacherName: new FormControl('', [Validators.required]),
      teacherRole: new FormControl('', [Validators.required]),

    })
  }

  ngOnInit(): void {
  }
  async getTeacher() {
    (await this.teacherSv.getTeacherList()).subscribe((data: any) => {
      this.teacherList = data.data
    })

  }
  async getTeacherInfo(Id: any) {
    await this.teacherSv.getTeacherInfo(Id).subscribe((data: any) => {
      this.teacherInfo = data.data
      this.patchFormValue(data.data)

    })
  }

  //Support function
  patchFormValue(data: any) {
    this.updateTeacherForm.setValue({
      teacherId: data._id,
      teacherUserName: data.userName,
      teacherPassWord: data.password,
      teacherName: data.fullName,
      teacherRole: data.role,
    })
    this.Role = data.role
  }
  //
  async addTeacher() {
    let tf = this.addTeacherForm.controls
    await this.teacherSv.addTeacher(tf['teacherName'].value, tf['teacherUserName'].value, tf['teacherPassWord'].value, tf['teacherRole'].value).subscribe(() => {
      this.getTeacher()
    })
  }

  async updateTeacher() {
    let tf = this.updateTeacherForm.controls
    this.teacherSv.updateTeacher(this.teacherInfo._id, tf['teacherName'].value, tf['teacherUserName'].value, tf['teacherPassWord'].value, tf['teacherRole'].value).subscribe(() => {
      this.getTeacher()
    })
  }

  async deleteTeacher() {

    await this.teacherSv.deleteTeacher(this.teacherInfo._id).subscribe((result: any) => {

      this.getTeacher()
    })


  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  updateStudentForm: FormGroup
  addStudentForm: FormGroup
  studentList: any;
  student: any;
  p:any=1
  constructor(public studentSv: StudentService, private route: Router, private fb: FormBuilder,public auth:AuthService) {
    this.getStudent();

    this.updateStudentForm = new FormGroup({
      studentId: new FormControl(''),
      studentName: new FormControl('', [Validators.required]),
      studentDescription: new FormControl('', [Validators.required]),
    })
    this.addStudentForm = new FormGroup({
      studentId: new FormControl(''),
      studentName: new FormControl('', [Validators.required]),
      studentDescription: new FormControl('', [Validators.required]),
    })


  }

  ngOnInit(): void {

  }
  async getStudent() {
    (await this.studentSv.getStudent()).subscribe((data: any) => {
      this.studentList = data.data
    })

  }
  async getStudentDetail(Id: any) {
    let temp = this.studentSv.getStudentBySId(Id)
    temp.subscribe((data: any) => {
      this.patchFormValue(data)
    })
  }
  //Support function
  patchFormValue(data: any) {

    this.updateStudentForm.setValue({
      studentId: data.result.sid,
      studentName: data.result.fullName,
      studentDescription: data.result.description,
    })
  }
  //
  async addStudent() {
    try {
      this.studentSv.addStudent(
        this.addStudentForm.controls['studentName'].value,
        this.addStudentForm.controls['studentDescription'].value).subscribe(() => {
          this.getStudent()
        })
    } catch (err) {
      alert("Error on Add")
    }
  }
  async updateStudent() {
    try {
      this.studentSv.updateStudent(this.updateStudentForm.controls['studentId'].value,
        this.updateStudentForm.controls['studentName'].value,
        this.updateStudentForm.controls['studentDescription'].value).subscribe(() => {
          this.getStudent()
        })
    } catch (err) {
      alert("Error on Update")
    }

  }
  async deleteStudent() {
    try {
      await this.studentSv.deleteStudentById(this.updateStudentForm.controls['studentId'].value,
      ).subscribe((result: any) => {
        alert(result.result)
        this.getStudent()
      })
    } catch (err) {
      alert("Error on Delete")
    }

  }
}

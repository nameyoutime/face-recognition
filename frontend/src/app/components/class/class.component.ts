import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ClassService } from 'src/app/services/class.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {

  loadClassList: boolean = false;
  deleteClassForm: FormGroup;
  p: any = 1;
  classDetail: any;
  random!: number;
  constructor(public classSv: ClassService, public route: Router, public fb: FormBuilder, public auth: AuthService) {


    this.deleteClassForm = new FormGroup({
      classId: new FormControl(''),

    })
  }

  ngOnInit(): void {
    if (this.auth.user.role != 'teacher') {
      this.getClass();
    }
    else {
      this.getTeacherClass();
    }
    this.random = Math.floor(Math.random() * 9) + 1;
  }
  async getClassDetailDelete(classId: any) {
    await this.classSv.getClassById(classId).subscribe((data: any) => {
      this.classDetail = data.data
      // console.log(this.classDetail)
      this.patchFormValue(this.classDetail)
    })
  }
  patchFormValue(data: any) {
    this.deleteClassForm.setValue({
      classId: data._id,

    })
  }
  async getClass() {
    await this.classSv.getClass().then(() => {
      this.loadClassList = true

    })
  }
  async getTeacherClass() {
    await this.classSv.getTeacherClass(this.auth.user._id).then(() => {
      this.loadClassList = true

    })
  }
  getClassDetail(Id: any) {
    this.route.navigate(["table/class", Id]);
  }
  createClass() {
    this.route.navigate(["table/createclass"]);
  }
  async deleteClass() {
    (await this.classSv.deleteClassById(this.classDetail._id)).subscribe(() => {
      try {
        alert("Complete");
        this.getClass()
      } catch (er) {
        console.log(er)
      }
    })
  }

}

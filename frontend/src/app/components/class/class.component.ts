import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {

  loadClassList: boolean = false
  deleteClassForm: FormGroup
  p: any = 1
  classDetail: any
  constructor(public classSv: ClassService, public route: Router, public fb: FormBuilder) {
    this.getClass()
    this.deleteClassForm = new FormGroup({
      classId: new FormControl(''),

    })
  }

  ngOnInit(): void {

  }
  async getClassDetailDelete(classId: any) {
    await this.classSv.getClassById(classId).subscribe((data: any) => {
      this.classDetail = data.data
      console.log(this.classDetail)
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {

  loadClassList: boolean = false
  constructor(public classSv: ClassService,public route:Router) {
    this.getClass()
  }

  ngOnInit(): void {

  }
  async getClass() {
    await this.classSv.getClass().then(() => {
      this.loadClassList = true

    })
  }
  getClassDetail(Id: any) {
    this.route.navigate(["table/class",Id]);
  }

}

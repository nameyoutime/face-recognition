import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.scss']
})
export class ClassDetailComponent implements OnInit {

  Id: any;
  classDetail: any
  constructor(public classSv: ClassService, public acRoute: ActivatedRoute) {
    this.acRoute.params.subscribe((param: any) => {
      this.Id = param?.id
      this.getClassDetail()

    })

  }

  ngOnInit(): void {


  }
  async getClassDetail() {
    await this.classSv.getClassById(this.Id).subscribe((data: any) => {
      this.classDetail = data.data
    })
  }

}

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AttendanceService } from 'src/app/services/attendance.service';

@Component({
  selector: 'app-attendance-detail',
  templateUrl: './attendance-detail.component.html',
  styleUrls: ['./attendance-detail.component.scss']
})
export class AttendanceDetailComponent implements OnInit {
 p:any;
 Id:any;
 studentList:Array<any>=[];
  constructor(private acRoute:ActivatedRoute,private attendSvc:AttendanceService,private route:Router) {
    this.acRoute.params.subscribe((param: any) => {
      this.Id = param?.id

    });
   }

  ngOnInit(): void {
    this.getAttendance()
  }
  getAttendance(){
    this.attendSvc.getAttendance(this.Id).subscribe((data:any)=>{
      console.log(data.data.arr)
      this.studentList=data.data.arr
    })
  }


}

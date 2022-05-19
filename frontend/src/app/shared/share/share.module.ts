import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassComponent } from 'src/app/components/class/class.component';
import { ClassDetailComponent } from 'src/app/components/class-detail/class-detail.component';
import { CreateClassComponent } from 'src/app/components/create-class/create-class.component';
import { StudentComponent } from 'src/app/components/student/student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { TeacherComponent } from 'src/app/components/teacher/teacher.component';



@NgModule({
  declarations: [ClassComponent, ClassDetailComponent, CreateClassComponent,
    StudentComponent,TeacherComponent,],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule



  ],
  exports: [ClassComponent, ClassDetailComponent, CreateClassComponent, StudentComponent,ReactiveFormsModule,FormsModule,NgxPaginationModule,TeacherComponent]
})
export class ShareModule { }

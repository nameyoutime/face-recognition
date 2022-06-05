import { StudentComponent } from './../../components/student/student.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassDetailComponent } from 'src/app/components/class-detail/class-detail.component';
import { ClassComponent } from 'src/app/components/class/class.component';
import { TableComponent } from './table.component';
import { CreateClassComponent } from 'src/app/components/create-class/create-class.component';
import { TeacherComponent } from 'src/app/components/teacher/teacher.component';
import { AttendanceDetailComponent } from 'src/app/components/attendance-detail/attendance-detail.component';
import { AuthguardService } from 'src/app/services/authguard.service';
import { RoleguardService } from 'src/app/services/roleguard.service';

const routes: Routes = [{
  path: '', component: TableComponent, children: [
    { path: 'class', component: ClassComponent,canActivate:[AuthguardService] },
    { path: 'class/:id', component: ClassDetailComponent,canActivate:[AuthguardService] },
    { path: 'createclass', component: CreateClassComponent,canActivate:[AuthguardService] },
    { path: 'student', component: StudentComponent ,canActivate:[AuthguardService]},
    { path: 'student/:id', component: ClassDetailComponent ,canActivate:[AuthguardService]},
    { path: 'teacher', component: TeacherComponent ,canActivate:[RoleguardService]},
    { path: 'attendance/:id', component: AttendanceDetailComponent,canActivate:[AuthguardService] },
  ]
},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableRoutingModule { }

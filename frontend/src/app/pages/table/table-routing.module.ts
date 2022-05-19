import { StudentComponent } from './../../components/student/student.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassDetailComponent } from 'src/app/components/class-detail/class-detail.component';
import { ClassComponent } from 'src/app/components/class/class.component';
import { TableComponent } from './table.component';
import { CreateClassComponent } from 'src/app/components/create-class/create-class.component';
import { TeacherComponent } from 'src/app/components/teacher/teacher.component';

const routes: Routes = [{ path: '', component: TableComponent },{path:'class',component:ClassComponent},
{path:'class/:id',component:ClassDetailComponent},
{path:'createclass',component:CreateClassComponent},
{path:'student',component:StudentComponent},{path:'student/:id',component:ClassDetailComponent},
{path:'teacher',component:TeacherComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableRoutingModule { }

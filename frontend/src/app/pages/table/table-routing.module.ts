import { StudentComponent } from './../../components/student/student.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassDetailComponent } from 'src/app/components/class-detail/class-detail.component';
import { ClassComponent } from 'src/app/components/class/class.component';
import { TableComponent } from './table.component';

const routes: Routes = [{ path: '', component: TableComponent },{path:'class',component:ClassComponent},{path:'class/:id',component:ClassDetailComponent},
{path:'student',component:StudentComponent},{path:'student/:id',component:ClassDetailComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableRoutingModule { }

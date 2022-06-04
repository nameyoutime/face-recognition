import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'table', loadChildren: () => import('./pages/table/table.module').then(m => m.TableModule) }, 
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) }, 
  { path: 'class', loadChildren: () => import('./pages/class/class.module').then(m => m.ClassModule) }, 
  { path: 'student', loadChildren: () => import('./pages/student/student.module').then(m => m.StudentModule) }, 
  { path: 'teacher', loadChildren: () => import('./pages/teacher/teacher.module').then(m => m.TeacherModule) },
  { path: 'class-detail', loadChildren: () => import('./pages/class-detail/class-detail.module').then(m => m.ClassDetailModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

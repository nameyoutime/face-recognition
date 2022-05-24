import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'table', loadChildren: () => import('./pages/table/table.module').then(m => m.TableModule) }, { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) }, { path: 'test', loadChildren: () => import('./pages/test/test.module').then(m => m.TestModule) }, { path: 'test1', loadChildren: () => import('./pages/test1/test1.module').then(m => m.Test1Module) }, { path: 'Class', loadChildren: () => import('./pages/class/class.module').then(m => m.ClassModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

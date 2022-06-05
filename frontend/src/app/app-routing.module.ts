import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardService } from './services/authguard.service';


const routes: Routes = [
  { path: 'table', loadChildren: () => import('./pages/table/table.module').then(m => m.TableModule),canActivate:[AuthguardService] },
  { path: '', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

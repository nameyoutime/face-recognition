import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleguardService implements CanActivate {

  constructor(private auth: AuthService, private route: Router) { }
  canActivate(): boolean {

    if (this.auth.user.role == 'admin') {
      return true
    } else {
      alert("You are not allowed to access this page")
      this.route.navigate(['table'])
      return false
    }

  }
}

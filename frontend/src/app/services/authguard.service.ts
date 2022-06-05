import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private auth: AuthService,private route:Router) { }
  canActivate(): boolean {
    this.auth.getUser()
    if (!this.auth.getAuth()) {
      return true;
    } else {
      alert("You are not logged in to access this page")
      this.route.navigate([''])
      return false;
    }

  }
}

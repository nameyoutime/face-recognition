import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;
  constructor(private http: HttpClient, private route: Router) {

  }

  login(username: any, password: any) {
    return this.http.get(`${environment.api}teacher/login/${username}?password=${password}`)
  }
  getUser(){
    this.user = JSON.parse(localStorage.getItem("user")!)

  }
  logOut() {
    localStorage.clear()
    this.user = null;

  }

 public getAuth() {
    return (this.user == null) ? true : false;
  }

}

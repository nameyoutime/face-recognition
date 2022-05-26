import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login(username:any,password:any){
    return this.http.get(`${environment.api}teacher/login?userName=${username}&password${password}`)
  }
}

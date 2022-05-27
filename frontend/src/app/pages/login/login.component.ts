import { FormBuilder, FormGroup, Validator, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/services/teacher.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private route: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {

  }
  async signIn() {
    await this.auth.login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value).subscribe((data: any) => {
      try {
        if (data.data.length > 0) {
          this.auth.user = {
            userName: data.data[0].userName,
            role: data.data[0].role
          }
          localStorage.setItem("user", JSON.stringify(this.auth.user))
          this.auth.user = JSON.parse(localStorage.getItem("user")!)
          this.route.navigate(['table/'])
        }
        else {
          throw new Error("Can't Login")
        }
      } catch (err) {
        alert(err)
      }
    })
  }

}

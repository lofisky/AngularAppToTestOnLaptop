import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginMessage: string = '';
  constructor(private router: Router, private http: HttpClient) { }

  redirectToRegisterPage() {
    this.router.navigate(['/register']);
  }

  login() {
    this.http.post<boolean>('https://localhost:7109/api/auth/login', {
      email: this.email,
      password: this.password
    }).subscribe(success => {
      if (success) {
        this.loginMessage = `Login succeeded! Welcome, ${this.email}`;
        console.log("login success!Q!");
      }
      else {
        alert('Invalid credentials');
      }
    }, error => {
      this.loginMessage = 'errorrrr';
      console.error(error);
    });
  }
}

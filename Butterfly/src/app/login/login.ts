import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    console.log('Attempting login for user:', username);

    this.http.post('http://localhost:8080/api/login', null, { 
      params: { username, password },
      responseType: 'text' 
    })
      .subscribe(
        (response) => {
          console.log('Login response received:', response);
          if (response === 'success') {
            localStorage.setItem('user', username);
            this.router.navigate(['/profile']);
          } else {
            alert('Invalid username or password');
          }
        },
        (error) => {
          console.error('Server error during login:', error);
          alert('Server Error');
        }
      );
  }

}
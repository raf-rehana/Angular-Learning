import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
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
  .subscribe({
     next: (response) => {
        if (response === 'success') {
          localStorage.setItem('user', username);
          this.router.navigate(['/profile']);
        } else {
          alert('Invalid username or password');
        }
      },

      error: (error) => {
        console.error(error);
        alert('Server Error');
      }
    });
  }
}
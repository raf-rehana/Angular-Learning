import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    this.http.post('http://localhost:8080/api/login', null, { 
      params: { username, password },
      responseType: 'text' 
    })
      .subscribe(
        (response) => {
          if (response === 'success') {
            localStorage.setItem('user', username);
            this.router.navigate(['/profile']);
          } else {
            alert('Invalid username or password');
          }
        },
        (error) => {
          alert('Server Error');
        }
      );
  }

}
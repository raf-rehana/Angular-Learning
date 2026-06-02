import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  username = '';
  password = '';
  message = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const data = {
      username: this.username,
      password: this.password
    };
    this.http.post('http://localhost:8080/api/login', data, { responseType: 'text' })
    .subscribe({next: (response) => {
      this.message = response;
      if (response === 'success') {
          // store login state (optional)
          localStorage.setItem('user', this.username);

          // redirect to admin dashboard
          this.router.navigate(['/profile']);
        } else {
          this.message = 'Invalid username or password';
        }

      },
    },

      error: (error) => {console.error(error);
        this.message = 'Server Error';}
    });

  }
  
}

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})
export class Registration {

  constructor(private http: HttpClient, private router: Router) {}

  onRegister(
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);

    this.http.post('http://localhost:8080/api/registration', formData, { responseType: 'text' })
      .subscribe({
        next: () => {
          alert('Registration successful!');
          this.router.navigate(['/profile']);
        },
        error: (err) => {
          console.error('Registration failed:', err);
          alert('Registration failed. Please try again.');
        }
      });
  }
}
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './registration.html',
  styleUrl: './registration.css',
})
export class Registration {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}


  register() {

    const firstName =
      (document.getElementById('firstName') as HTMLInputElement).value;

    const lastName =
      (document.getElementById('lastName') as HTMLInputElement).value;

    const phone =
      (document.getElementById('phone') as HTMLInputElement).value;

    const email =
      (document.getElementById('email') as HTMLInputElement).value;

    const password =
      (document.getElementById('password') as HTMLInputElement).value;

    const confirmPassword =
      (document.getElementById('confirmPassword') as HTMLInputElement).value;


    this.onRegister(
      firstName,
      lastName,
      phone,
      email,
      password,
      confirmPassword
    );

  }


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


    this.http.post(
      'http://localhost:8080/api/registration',
      formData,
      { responseType: 'text' }
    )
    .subscribe({

  next: (response) => {

    if (response === 'success') {

      localStorage.setItem('user', email);

      alert("Registration successful");

      this.router.navigate(['/profile']);

    } else {

      alert("Registration failed");

    }

  },


  error: (err) => {

    console.error(err);

    alert('Registration failed. Please try again.');

  }

})}};
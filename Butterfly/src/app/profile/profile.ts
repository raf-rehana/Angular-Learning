import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {

  user: any = {};

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const username = localStorage.getItem('user');
    console.log('Profile component initialized. Username:', username);

    this.http.get(`http://localhost:8080/api/profile/${username}`)
      .subscribe(
        (res) => {
          console.log('Profile data successfully loaded:', res);
          this.user = res;
        },
        (err) => {
          console.error('Error fetching profile from backend:', err);
        }
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {

  user: any = {};

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const username = localStorage.getItem('user');

    this.http.get(`http://localhost:8085/api/profile/${username}`)
      .subscribe((res) => {
        this.user = res;
      });
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

}
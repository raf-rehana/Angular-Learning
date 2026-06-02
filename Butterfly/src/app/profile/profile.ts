import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {

  user: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const username = localStorage.getItem('user');

    this.http.get(`http://localhost:8085/api/profile/${username}`)
      .subscribe((res) => {
        this.user = res;
      });
  }
}
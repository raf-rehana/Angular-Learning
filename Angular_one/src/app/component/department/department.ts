import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DepartmentService } from '../../services/department.service';
import { DepartmentModel } from '../../model/department.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-department',
  imports: [CommonModule, FormsModule],
  templateUrl: './department.html',
  styleUrl: './department.css',
})
export class Department implements OnInit {

  departmentList: DepartmentModel[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.isLoading = true;
    this.departmentService.getAllDepartment().subscribe({
      next: (data) => {
        this.departmentList = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load departments.';
        this.isLoading = false;
      }
    });
  }

  deleteDepartment(id: string): void {
    if (confirm('Are you sure you want to delete?')) {
      this.departmentService.deleteDepartment(id).subscribe({
        next: () => this.loadDepartments(),
        error: () => this.errorMessage = 'Delete failed.'
      });
    }
  }

}
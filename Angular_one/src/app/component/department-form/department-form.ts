import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DepartmentService } from '../../services/department.service';
import { DepartmentModel } from '../../model/department.model';

@Component({
  selector: 'app-department-form',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './department-form.html',
  styleUrl: './department-form.css',
})
export class DepartmentForm implements OnInit {

  isEditMode: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  department: DepartmentModel = {
    id: '',
    name: '',
    email: ''
  };

  constructor(
    private departmentService: DepartmentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.loadDepartment(id);
    }
  }

  loadDepartment(id: string): void {
    this.isLoading = true;
    this.departmentService.getByID(id).subscribe({
      next: (data) => {
        this.department = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load department.';
        this.isLoading = false;
      }
    });
  }

  save(): void {
    if (this.isEditMode) {
      this.update();
    } else {
      this.create();
    }
  }

  create(): void {
    this.isLoading = true;
    this.departmentService.saveDepartment(this.department).subscribe({
      next: () => {
        this.successMessage = 'Department created successfully!';
        this.isLoading = false;
        this.router.navigate(['/department']);
      },
      error: () => {
        this.errorMessage = 'Failed to create department.';
        this.isLoading = false;
      }
    });
  }

  update(): void {
    this.isLoading = true;
    this.departmentService.updateDepartment(this.department).subscribe({
      next: () => {
        this.successMessage = 'Department updated successfully!';
        this.isLoading = false;
        this.router.navigate(['/department']);
      },
      error: () => {
        this.errorMessage = 'Failed to update department.';
        this.isLoading = false;
      }
    });
  }

  reset(): void {
    this.department = { id: '', name: '', email: '' };
    this.errorMessage = '';
    this.successMessage = '';
  }

}
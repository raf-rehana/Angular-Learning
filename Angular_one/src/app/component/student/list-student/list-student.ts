import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { StudentModel } from '../../../model/student.model';
import { StudentService } from '../../../services/student.service';

@Component({
  selector: 'app-list-student',
  imports: [],
  templateUrl: './list-student.html',
  styleUrl: './list-student.css',
})
export class ListStudent implements OnInit{

  students: StudentModel[] = [];

  constructor(
    private studentService: StudentService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadAllStudent();
  }

  loadAllStudent() {
    this.studentService.getAllStudents().subscribe({
      next: (data) => {
        this.students = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load students', err);
      }
    });
  }

  remove(id: string) {
    this.studentService.deleteStudent(id).subscribe(
      {
        next: () => {
          this.loadAllStudent();
        },
        error: (err) => {
          console.error('Failed to delete student', err);
        }
      }
    )
  }
}


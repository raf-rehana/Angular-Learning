import { Routes } from '@angular/router';
import { Home } from './component/layout/home/home';
import { Department } from './component/department/department';
import { DepartmentForm } from './component/department-form/department-form';
import { ListStudent } from './component/student/list-student/list-student';
import { AddEditStudent } from './component/student/add-edit-student/add-edit-student';

export const routes: Routes = [

  // Home
  { path: '', component: Home },

  // Department
  { path: 'department',          component: Department     },
  { path: 'department/save',     component: DepartmentForm },
  { path: 'department/edit/:id', component: DepartmentForm },

  // Student
  { path: 'student',          component: ListStudent    },
  { path: 'student/save',     component: AddEditStudent },
  { path: 'student/edit/:id', component: AddEditStudent },

  // Wildcard
  { path: '**', redirectTo: '' }

];
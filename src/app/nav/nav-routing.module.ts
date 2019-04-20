import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../services/auth.guard';
import { NavComponent } from './nav.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ViewStudentComponent } from '../dashboard/view-student/view-student.component';
import { EditStudentComponent } from '../dashboard/edit-student/edit-student.component';
import { AddStudentComponent } from '../dashboard/add-student/add-student.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: NavComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent }
    ]
  },
  {
    path: 'student',
    component: NavComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'view/:id', component: ViewStudentComponent },
      { path: 'edit/:id', component: EditStudentComponent },
      { path: 'add', component: AddStudentComponent }
    ]
  },
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../services/auth.guard';
import { NavComponent } from './nav.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ViewStudentComponent } from '../dashboard/view-student/view-student.component';

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
      { path: 'view/:id', component: ViewStudentComponent }
    ]
  },
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavRoutingModule { }

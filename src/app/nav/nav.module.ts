import { NgModule } from '@angular/core';

import { NavRoutingModule } from './nav-routing.module';
import { NavComponent } from './nav.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { ViewStudentComponent } from '../dashboard/view-student/view-student.component';
import { EditStudentComponent } from '../dashboard/edit-student/edit-student.component';
import { AddStudentComponent } from '../dashboard/add-student/add-student.component';

@NgModule({
  declarations: [NavComponent, DashboardComponent, ViewStudentComponent, EditStudentComponent, AddStudentComponent],
  imports: [
    SharedModule,
    NavRoutingModule
  ]
})
export class NavModule { }

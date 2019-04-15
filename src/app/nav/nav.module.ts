import { NgModule } from '@angular/core';

import { NavRoutingModule } from './nav-routing.module';
import { NavComponent } from './nav.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { ViewStudentComponent } from '../dashboard/view-student/view-student.component';

@NgModule({
  declarations: [NavComponent, DashboardComponent, ViewStudentComponent],
  imports: [
    SharedModule,
    NavRoutingModule
  ]
})
export class NavModule { }

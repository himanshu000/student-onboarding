import { NgModule } from '@angular/core';

import { NavRoutingModule } from './nav-routing.module';
import { NavComponent } from './nav.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NavComponent, DashboardComponent],
  imports: [
    SharedModule,
    NavRoutingModule
  ]
})
export class NavModule { }

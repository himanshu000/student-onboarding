import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  constructor(private authService: AuthService, private router: Router) {}
  currentUser = this.authService.currentUser.getValue();

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}

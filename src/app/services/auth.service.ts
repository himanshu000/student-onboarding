import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser: BehaviorSubject<string> = new BehaviorSubject(null);
  constructor() { }

  loginUser(userName: string, password: string) {
    if (userName && password) {
      this.currentUser.next(userName);
    }
  }

  logout() {
    this.currentUser.next(null);
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  loginUser(userName: string, password: string) {
    if (userName && password) {
      localStorage.setItem('currentUser', JSON.stringify(userName));
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}

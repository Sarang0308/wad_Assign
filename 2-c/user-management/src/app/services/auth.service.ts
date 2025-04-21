import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  register(userData: any) {
    localStorage.setItem(userData.email, JSON.stringify(userData));
    return true;
  }

  login(email: string, password: string) {
    const user = JSON.parse(localStorage.getItem(email) || '{}');
    return user && user.password === password ? user : null;
  }

  getUser(email: string) {
    return JSON.parse(localStorage.getItem(email) || '{}');
  }
}

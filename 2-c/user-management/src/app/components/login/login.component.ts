import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    const user = this.authService.login(this.email, this.password);
    if (user) {
      localStorage.setItem('loggedInUser', this.email);
      alert('Login successful');
      this.router.navigate(['/profile']);
    } else {
      alert('Invalid credentials');
    }
  }
}

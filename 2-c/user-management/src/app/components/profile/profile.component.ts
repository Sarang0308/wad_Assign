import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
    const email = localStorage.getItem('loggedInUser');
    if (email) {
      this.user = this.authService.getUser(email);
    }
  }
}

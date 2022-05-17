import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Iuser } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public user: Iuser;
  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/user/home']);
    }
    this.user = {
      userName: '',
      password: '',
    };
  }

  ngOnInit(): void {}
  onSubmit(): void {
    const { userName, password } = this.user;
    this.authService
      .login(userName, password)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['/user/home']);
        },
        error: (err) => {
          console.log('error', err);
        },
      });
  }
}

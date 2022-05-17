import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { validInput } from '../core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  registerFormroup = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      this.checkPasswordMatch.bind(this)('password'),
    ]),
  });

  constructor(private authService: AuthService, private router: Router) {
    this.subscription = new Subscription();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.registerFormroup
        .get('password')
        ?.valueChanges.pipe(distinctUntilChanged())
        .subscribe(() => {
          this.registerFormroup
            .get('confirmPassword')
            ?.updateValueAndValidity();
        })
    );
  }

  checkPasswordMatch(controlName: string): any {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (this.registerFormroup?.get(controlName)?.value !== control.value) {
        return { invalidPassword: true };
      }
      return null;
    };
  }

  validInput(control: AbstractControl | null): string | null {
    return validInput(control);
  }
  onSubmit() {
    const { password, userName } = this.registerFormroup.value;
    this.authService.register(userName, password).subscribe((res) => {
      console.log('error', res);
      if (res?.error) {
        return;
      }
      this.router.navigate(['user/login']);
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

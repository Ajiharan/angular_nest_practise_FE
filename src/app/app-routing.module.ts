import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user/login',
    pathMatch: 'full',
  },
  {
    path: 'user/login',
    component: LoginComponent,
  },
  {
    path: 'user/register',
    component: RegisterComponent,
  },
  {
    path: 'user/home',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    data: {
      role: 'user',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

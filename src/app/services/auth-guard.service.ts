import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  private helper: JwtHelperService;

  constructor(private router: Router, private authService: AuthService) {
    this.helper = new JwtHelperService();
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const currentUser = this.authService.currentUserValue;
    const expectedRole = route.data['role'];

    const decodedToken = this.helper.decodeToken(
      localStorage.getItem('currentUser')!
    );
    console.log('decodedToken', decodedToken);
    if (currentUser && expectedRole === decodedToken.role) {
      return true;
    }
    this.authService.logout();
    this.router.navigate(['/user/login']);
    return false;
  }
}

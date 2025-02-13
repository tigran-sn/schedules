import { inject, Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const token = this.authService.getToken();
    const isAuthPage = route.data['isAuthPage'];

    if (token) {
      if (isAuthPage) {
        return this.router.createUrlTree(['/users']);
      }
      return true;
    }

    if (!isAuthPage) {
      return this.router.createUrlTree(['/login'], {
        queryParams: { returnUrl: state.url },
      });
    }

    return true;
  }
}

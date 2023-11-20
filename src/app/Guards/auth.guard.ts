import { AuthService } from '../services/auth.service';

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree | any> | Promise<boolean | UrlTree> | boolean | UrlTree {


    return this._authService.user.pipe(
      take(1),
      map((user): boolean | any => {
        if (user) {
          return true;
        }
        else{
          Swal.fire({
            title: 'UnAuthorized..!',
            icon:'error',
            text: 'Please login to access this page.',
            timer: 2000
          })
        }
         return false
        // return this.router.createUrlTree(['/login']);
      })
    )
  }
}

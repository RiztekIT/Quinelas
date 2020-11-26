import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserTypeGuard implements CanActivate {

  constructor( private userService:UserService,
               private router: Router){

  }
  canActivate():boolean {
    if ( this.userService.isAdmin() ) {
      return true;
    } else {
      this.router.navigateByUrl('/user-profile');
      return false;
    }
  }
  
}

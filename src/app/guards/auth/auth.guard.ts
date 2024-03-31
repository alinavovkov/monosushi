import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ROLE } from '../../constants/role.constante';

export const authGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    // router: Router
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string)

    if(currentUser && (currentUser.role === ROLE.ADMIN || currentUser.role === ROLE.USER)){
        return true;
    }

    // router.navigate(['']);
    return false;
  // return router.parseUrl('/');
};

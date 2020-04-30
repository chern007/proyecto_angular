import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router) { };

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {



    var resultObservable : Observable<boolean> = this.authenticationService.getStatus().pipe( //--> Observable<boolean>

      map(status => {

        console.log("IMPRIMIMOS EL STATUS DE LA AUTENTIFICACION: ");
        console.log(status);

        if (status) {

          return true;

        } else {

          this.router.navigate(['login']);

          return false;

        }

      })

    );


    return resultObservable;


  }

}

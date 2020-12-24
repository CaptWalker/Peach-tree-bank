import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private localStorageService: LocalStorageService) { } //private jwtHelper: JwtHelperService, 

  public isAuthenticated(): boolean {
    const token = this.localStorageService.getToken();
    if(token !== undefined){
      return true;
    }
    else{
      return false;
    }

    // return !this.jwtHelper.isTokenExpired(token);
  }
}

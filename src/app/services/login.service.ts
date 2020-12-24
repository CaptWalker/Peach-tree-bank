import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { UserCred } from './../Models/userCred';
import { Customer } from '../Models/customer';
import { ToastService } from './toast.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../Models/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  
  private loginSubject: BehaviorSubject<string>;
  private loginStatus: Observable<string>;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private localStorageService: LocalStorageService, 
    private toast: ToastService
    ) {
      this.loginSubject = new BehaviorSubject<string>(this.localStorageService.getToken());
      this.loginStatus = this.loginSubject.asObservable();
    }

  loginUser = (userCred: UserCred): LoginResponse => {
    const userDetails: Customer[] = this.localStorageService.getFromLocalStorage('customers');
    const user = userDetails.filter((customer) => {
      if(customer.email === userCred.email && customer.password === userCred.password) { 
        return customer;
      }
    });
    if(user[0] !== undefined){
      this.localStorageService.setToken();
      this.loginSubject.next(this.localStorageService.getToken());
      this.loggedIn.next(true);
      this.toast.showSuccessMessage('Welcome '+ user[0].name);
      return {status: true, customer: user[0]};
    }
    else{
      this.toast.showError('Invalid Credentials');
      return {status: false};
    }
  }

  get isUserLoggedIn(){
    return this.loggedIn.asObservable();
  }

  logOut = () => {
    this.loggedIn.next(false);
    return this.localStorageService.removeToken();
  }

}

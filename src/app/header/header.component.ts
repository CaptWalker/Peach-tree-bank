import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  logInStatus;
  constructor(
    private router: Router, 
    private loginService: LoginService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    this.isLoggedIn()
  }

  isLoggedIn = () => {
    this.logInStatus = this.loginService.isUserLoggedIn;
  }

  logOut = () => {
    if(this.loginService.logOut()){
      this.toastService.showSuccessMessage('Logged Out!!');
      this.router.navigate(['']);
    }
  }

}

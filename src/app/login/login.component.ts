import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { UserCred } from '../Models/userCred';
import { LoginResponse } from '../Models/loginResponse';
import { LocalStorageService } from '../services/local-storage.service';
import { LoginService } from '../services/login.service';
import { CustomValidatorDirective } from '../utils/custom-validator.directive';
import { JsonpClientBackend } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  private customValidator: CustomValidatorDirective;
  constructor(
    private formbuilder: FormBuilder, 
    private loginService: LoginService,
    private router: Router) { 
    this.customValidator = new CustomValidatorDirective();
  }

  ngOnInit(): void {
    this.initialiseForm();
    // this.loginUser({email: 'dhruva@gmail.com', password: 'Abcd@1234'});
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  initialiseForm = () => {
    this.loginForm = this.formbuilder.group({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        this.customValidator.passwordValidator()
      ])
    });
  }

  loginUser = (value: UserCred) => {
    const response: LoginResponse = this.loginService.loginUser(value);
    if(response.status){
      const navigateExtra: NavigationExtras = {
        queryParams: {
          id: response.customer.id
        }
      }
      this.router.navigate(['dashboard'], navigateExtra);
    }
    else{
      this.initialiseForm();
    }
  }

}

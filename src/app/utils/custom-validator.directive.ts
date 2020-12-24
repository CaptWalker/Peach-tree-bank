import { Directive } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appCustomValidator]'
})
export class CustomValidatorDirective {

  private passwordRegex: RegExp;
  constructor() {
    this.passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
  }

  public passwordValidator = (): ValidatorFn => {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const test = this.passwordRegex.test(control.value);
      const stat = test ? null : {password: {value: control.value}};
      return stat;
    }
  }

  public amountValidator = (): ValidatorFn => {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const test = control.value > -1;
      const stat = test ? null : {amount: {value: control.value}};
      return stat;
    }
  }

}

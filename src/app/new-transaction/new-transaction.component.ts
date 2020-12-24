import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { Customer } from '../Models/customer';
import { Transaction } from '../Models/transaction';
import { ToastService } from '../services/toast.service';
import { TransactionService } from '../services/transaction.service';
import { CustomValidatorDirective } from '../utils/custom-validator.directive';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.scss']
})
export class NewTransactionComponent implements OnInit, OnChanges {

  @Input() customer: Customer;
  @Output() generateTransaction = new EventEmitter<Transaction>();

  paymentForm: FormGroup;
  fromAccount;
  beneficiaryAccount;

  private customValidator: CustomValidatorDirective

  constructor(
    private formBuilder: FormBuilder, 
    private toast: ToastService) { 
    this.customValidator = new CustomValidatorDirective();
  }

  ngOnChanges(): void {
    this.fromAccount = undefined;
    this.beneficiaryAccount = undefined;
  }

  ngOnInit(): void {
    this.initialiseForm();
  }

  get amount() { return this.paymentForm.get('amount'); }

  initialiseForm = () => {
    this.paymentForm = this.formBuilder.group({
      amount: new FormControl(null, [
        Validators.required,
        this.customValidator.amountValidator()
      ])
    });
  }

  setFromAccount = (value) => {
    this.fromAccount = value;
  }

  setBeneficiaryAccount = (value) => {
    this.beneficiaryAccount = value;
  }

  pay = (value) => {
    if(this.fromAccount === undefined){
      this.toast.showError('Please Select Your Account');
      return;
    }
    if(this.beneficiaryAccount === undefined){
      this.toast.showError('Please Select Beneficiary Account');
      return;
    }
    if(value.amount <= 0){
      this.toast.showError('Please add Amount');
      return;
    }
    if(value.amount > this.fromAccount.amount){
      this.paymentForm.controls['amount'].setValue(0);
      this.paymentForm.controls['amount']
      this.toast.showError('Insufficient Balance');
      return ;
    }

    // transaction Request Body
    const transaction: Transaction = {
      transactionId: Guid.create().toString(),
      beneficiaryAccount: this.beneficiaryAccount,
      initiatedBy: this.customer.id,
      senderAccount: this.fromAccount,
      amount: value.amount,
      createdDate: (new Date).toLocaleDateString()
    }
    this.generateTransaction.next(transaction);
    this.ngOnChanges();
    this.initialiseForm();
  } 

}

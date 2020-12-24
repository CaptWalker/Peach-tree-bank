import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Transaction } from './../Models/transaction';
import { Customer } from './../Models/customer';
import { Account } from '../Models/account';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private localStorageService: LocalStorageService) { }

  getTransactions = (initiatedBy: string): Transaction[] => {
    const transactions: Transaction[] = this.localStorageService.getFromLocalStorage('transactions');
    return transactions.filter((transaction: Transaction)=>{
      if(transaction.initiatedBy === initiatedBy){
        return transaction;
      }
    });
  }

  getCustomerDetails = (customerId: string): Customer => {
    const customers: Customer[] = this.localStorageService.getFromLocalStorage('customers');
    return (customers.filter((customer: Customer)=>{
      if(customer.id === customerId){
        return customer;
      }
    }))[0];
  }

  private updateAccount = (amount: number, accountNo: number ,accounts: Account[]): Account[] => {
    return accounts.filter((account) => {
      if(account.accountNo === accountNo){
        account.amount += amount;
      }
      return account;
    })
  }

  generateTransaction = (transaction: Transaction) => {
    let sender: Customer = this.getCustomerDetails(transaction.initiatedBy);
    let receiver: Customer = this.getCustomerDetails(transaction.beneficiaryAccount.id);

    sender.accounts = this.updateAccount(-Math.abs(transaction.amount), transaction.senderAccount.accountNo, sender.accounts);
    receiver.accounts = this.updateAccount( transaction.amount , transaction.beneficiaryAccount.accountNo, receiver.accounts);
    this.localStorageService.updateCustomer(sender);
    this.localStorageService.updateCustomer(receiver);

    this.localStorageService.setOnLocalStorage('transactions', transaction);
    return transaction;
  }

}

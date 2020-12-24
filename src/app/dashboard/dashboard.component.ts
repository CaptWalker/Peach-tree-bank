import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../Models/customer';
import { Transaction } from '../Models/transaction';
import { ToastService } from '../services/toast.service';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  transactions: Transaction[];
  customerId: string;
  customer: Customer;
  cashBalance: number = 0;


  constructor(
    private route: ActivatedRoute, 
    private transactionService: TransactionService,
    private toastService: ToastService) {
    this.route.queryParams.subscribe((param) => {
      this.customerId = param['id'];
    })
  }

  ngOnInit(): void {
    this.getCustomerDetails(this.customerId);
    this.getAllTransactions(this.customerId);
  }

  getAllTransactions = (initiatedBy) => {
    this.transactions = this.transactionService.getTransactions(initiatedBy);
  }

  getCustomerDetails = (customerId: string) => {
    this.customer = this.transactionService.getCustomerDetails(customerId);
    this.calculateCashBalance();
  }

  generateTransaction = (transaction: Transaction) => {
    const newTransaction: Transaction = this.transactionService.generateTransaction(transaction);
    this.toastService.showSuccessMessage('Payment Successful');
    this.getCustomerDetails(transaction.initiatedBy);
    this.getAllTransactions(transaction.initiatedBy);
    return true;
  }

  calculateCashBalance = () => {
    this.cashBalance = 0;
    this.customer.accounts.forEach(acc => {
      this.cashBalance += acc.amount;
    })
  }

}

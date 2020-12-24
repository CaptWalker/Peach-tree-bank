import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Transaction } from '../Models/transaction';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.scss']
})
export class TransactionTableComponent implements OnInit, OnChanges {

  @Input() transactions: Transaction[];
  @Input() cashBalance: number;

  constructor() { }
  
  ngOnChanges(): void {
    
  }
  ngOnInit(): void {
  }

}

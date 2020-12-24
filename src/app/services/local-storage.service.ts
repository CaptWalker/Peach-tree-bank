import { Inject, Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Customer } from '../Models/customer';
import { Transaction } from '../Models/transaction';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { 
  }

  getToken = (): string => {
    return this.storage.get('token');
  }

  setToken = () => {
    this.storage.set('token', Guid.create().toString());
    return true;
  }

  removeToken = () => {
    this.storage.remove('token');
    return true;
  }

  getFromLocalStorage = (key: string) => {
    return JSON.parse(this.storage.get(key) || '[]');
  }

  updateCustomer = (customer: Customer): Customer[] => {
    let customers: Customer[] = this.getFromLocalStorage('customers');
    for(let c of customers){
      if(c.id === customer.id){
        customers[customers.indexOf(c)] = customer;
      }
    }
    this.storage.set('customers', JSON.stringify(customers));
    return customers;
  }

  setOnLocalStorage = (key: string, value: any) => {
    let currentList = this.storage.get(key) || '[]';
    currentList = this.getFromLocalStorage(key);
    currentList.push(value);
    currentList = JSON.stringify(currentList);
    this.storage.set(key, currentList);
    return 
  }

  initialiseStorage = () => {
    const customers: Customer[] = [
      {
        id: 'd4fbd123-dad4-4311-bb85-5b59f9dbdd08',
        email: 'dhruva@gmail.com',
        password: 'Abcd@1234',
        name: 'dhruva',
        accounts: [
          {
            accountNo: 812323456,
            amount: 200
          },
          {
            accountNo: 812398765,
            amount: 2000
          },
          {
            accountNo: 812323498,
            amount: 6000
          }
        ],
        beneficiaries: [
          {
            id: 'c5b6192c-6f83-4474-bea1-22fd5674f907',
            accountNo: 812354876
          },
          {
            id: 'c5b6192c-6f83-4474-bea1-22fd5674f907',
            accountNo: 812365785
          }
        ]
      },
      {
        id: 'c5b6192c-6f83-4474-bea1-22fd5674f907',
        email: 'user1@gmail.com',
        password: 'Abcd@1234',
        name: 'User1',
        accounts: [
          {
            accountNo: 812354876,
            amount: 8766
          },
          {
            accountNo: 812365434,
            amount: 8000
          },
          {
            accountNo: 812309786,
            amount: 4000
          }
        ],
        beneficiaries: [
          {
            id: 'd4fbd123-dad4-4311-bb85-5b59f9dbdd08',
            accountNo: 812323456
          },
          {
            id: 'c5b6192c-6f83-4474-bea1-22fd5674f907',
            accountNo: 812309321
          },
          {
            id: 'c5b6192c-6f83-4474-bea1-22fd5674f907',
            accountNo: 812354456
          }
        ]
      },
      {
        id: '556ed2a4-5acd-44c0-bebe-4daa94bc56fa',
        email: 'user2@gmail.com',
        password: 'Abcd@1234',
        name: 'User2',
        accounts: [
          {
            accountNo: 812354456,
            amount: 100
          },
          {
            accountNo: 812365785,
            amount: 9000
          },
          {
            accountNo: 812309321,
            amount: 10000
          }
        ],
        beneficiaries: [
          {
            id: 'c5b6192c-6f83-4474-bea1-22fd5674f907',
            accountNo: 812365434
          },
          {
            id: 'd4fbd123-dad4-4311-bb85-5b59f9dbdd08',
            accountNo: 812323456
          }
        ]
      },
    ];

    const transactions: Transaction[] = [
      {
        transactionId: 'd8a1c740-7004-4933-8beb-30e5a5e6f5ac',
        initiatedBy: 'd4fbd123-dad4-4311-bb85-5b59f9dbdd08',
        senderAccount: {
          accountNo: 812323456
        },
        beneficiaryAccount: {
          id: 'c5b6192c-6f83-4474-bea1-22fd5674f907',
          accountNo: 812354876
        },
        amount: 300,
        createdDate: (new Date()).toLocaleDateString()
      },
      {
        transactionId: 'd17ca3c3-caf8-40b3-9df4-cbc1be12e782',
        initiatedBy: 'd4fbd123-dad4-4311-bb85-5b59f9dbdd08',
        senderAccount: {
          accountNo: 812398765
        },
        beneficiaryAccount: {
          id: 'c5b6192c-6f83-4474-bea1-22fd5674f907',
          accountNo: 812354876
        },
        amount: 400,
        createdDate: (new Date()).toLocaleDateString()
      },
      {
        transactionId: '3268e68a-675f-4293-b578-c3224bbda94a',
        initiatedBy: 'd4fbd123-dad4-4311-bb85-5b59f9dbdd08',
        senderAccount: {
          accountNo: 812398765
        },
        beneficiaryAccount: {
          id: 'c5b6192c-6f83-4474-bea1-22fd5674f907',
          accountNo: 812365785
        },
        amount: 1000,
        createdDate: (new Date()).toLocaleDateString()
      }
    ];

    this.storage.set('customers', JSON.stringify(customers));
    this.storage.set('transactions', JSON.stringify(transactions));
  }
}

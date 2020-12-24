import {Beneficiary} from './beneficiary';
export interface Transaction{
    transactionId: string,
    initiatedBy: string,
    senderAccount: {
        accountNo: number
    },
    beneficiaryAccount: Beneficiary,
    amount: number,
    createdDate: string
}
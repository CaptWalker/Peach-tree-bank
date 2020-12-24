import { Beneficiary } from "./beneficiary";
import { Account } from "./account";

export interface Customer {
    id: string,
    name: string,
    email: string,
    password: string,
    accounts: Account[],
    beneficiaries: Beneficiary[]
}
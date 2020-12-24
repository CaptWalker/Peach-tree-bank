import { Customer } from './customer';
export interface LoginResponse{
    status: boolean,
    customer?: Customer
}
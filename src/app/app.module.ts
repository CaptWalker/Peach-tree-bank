import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { CustomValidatorDirective } from './utils/custom-validator.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToastService } from './services/toast.service';
import { LoginService } from './services/login.service';
import { TransactionService } from './services/transaction.service';
import { LocalStorageService } from './services/local-storage.service';
import { ToastComponent } from './toast/toast.component';
import { NewTransactionComponent } from './new-transaction/new-transaction.component';
import { TransactionTableComponent } from './transaction-table/transaction-table.component';
import { LOCAL_STORAGE, StorageServiceModule } from 'ngx-webstorage-service';
import { JwtModule } from '@auth0/angular-jwt';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    CustomValidatorDirective,
    DashboardComponent,
    ToastComponent,
    NewTransactionComponent,
    TransactionTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StorageServiceModule,
    JwtModule
  ],
  providers: [
    ToastService,
    LocalStorageService,
    LoginService,
    TransactionService,
    {
      provide: APP_INITIALIZER,
      useFactory: (lSS: LocalStorageService) => () => {return lSS.initialiseStorage();},
      deps: [LocalStorageService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

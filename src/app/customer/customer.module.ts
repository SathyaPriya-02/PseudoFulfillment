import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import {RequestpageComponent } from './requestpage/requestpage.component';
import { FormsModule } from '@angular/forms';
import { UserhomepageComponent } from './userhomepage/userhomepage.component';
import { RechargeplanComponent } from './rechargeplan/rechargeplan.component';
import { UsernavbarComponent } from './usernavbar/usernavbar.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { PaypageComponent } from './paypage/paypage.component';
import { GooglepayComponent } from './googlepay/googlepay.component';
import { DebitcardComponent } from './debitcard/debitcard.component';
import { OtppageComponent } from './otppage/otppage.component';
import { MyuseraccountComponent } from './myuseraccount/myuseraccount.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PlannavbarComponent } from './plannavbar/plannavbar.component';
import { StarterpageComponent } from './starterpage/starterpage.component';
import { StarterActivateComponent } from './starter-activate/starter-activate.component';
import { NewUserSuccessMessageComponent } from './new-user-success-message/new-user-success-message.component';
import { RechargesucessComponent } from './rechargesucess/rechargesucess.component';
import { WalletcardComponent } from './walletcard/walletcard.component';
import { ProWalletPaymentComponent } from './pro-wallet-payment/pro-wallet-payment.component';

// import { NgOtpInputModule } from 'ng-otp-input/public_api';



@NgModule({
  declarations: [
    HomepageComponent,FooterComponent,
    LoginComponent,
    NavbarComponent,
    RequestpageComponent,
    UserhomepageComponent,
    RechargeplanComponent,
    UsernavbarComponent,
    PaypageComponent,
    GooglepayComponent,
    DebitcardComponent,
    OtppageComponent,
    MyuseraccountComponent,
    PlannavbarComponent,
    StarterpageComponent,
    StarterActivateComponent,
    NewUserSuccessMessageComponent,
    RechargesucessComponent,
    WalletcardComponent,
    ProWalletPaymentComponent
    
  
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,FormsModule,NgOtpInputModule, ReactiveFormsModule
  ],
  exports:[
    HomepageComponent,NavbarComponent,UserhomepageComponent,RechargeplanComponent
  ]
})
export class CustomerModule { }

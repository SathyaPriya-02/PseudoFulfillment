import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RequestpageComponent } from './requestpage/requestpage.component';
import { RechargeplanComponent } from './rechargeplan/rechargeplan.component';
import { UserhomepageComponent } from './userhomepage/userhomepage.component';
import { PaypageComponent } from './paypage/paypage.component';
import { GooglepayComponent } from './googlepay/googlepay.component';
import { DebitcardComponent } from './debitcard/debitcard.component';
import { OtppageComponent } from './otppage/otppage.component';
import { MyuseraccountComponent } from './myuseraccount/myuseraccount.component';
import { StarterpageComponent } from './starterpage/starterpage.component';
import { StarterActivateComponent } from './starter-activate/starter-activate.component';
import { NewUserSuccessMessageComponent } from './new-user-success-message/new-user-success-message.component';
import { RechargesucessComponent } from './rechargesucess/rechargesucess.component';
import { WalletcardComponent } from './walletcard/walletcard.component';
import { ProWalletPaymentComponent } from './pro-wallet-payment/pro-wallet-payment.component';


//import { CanActivateGuard } from '../auth.guard';

const routes: Routes = [
  {path : "login" , component:LoginComponent},
  {path : "" , component:HomepageComponent},
  {path : "home" , component:HomepageComponent},
  {path : "requestsim" , component:RequestpageComponent},
  {path : "recharge" , component:RechargeplanComponent},
  {path : "user" , component:UserhomepageComponent},
  {path : "profile" , component:MyuseraccountComponent},
  {path : "pay" , component:PaypageComponent},
  {path : "google-pay" , component:GooglepayComponent},
  {path : "debit-card" , component:DebitcardComponent},
  {path : "otp" , component:OtppageComponent},
  {path : "starter-recharge", component :StarterpageComponent},
  {path:"starter-pay",component:StarterActivateComponent},
  {path:"activation-success",component:NewUserSuccessMessageComponent},
  {path:"recharge-success",component:RechargesucessComponent},
  { path: 'wallet-card', component: WalletcardComponent },
  {path:'wallet-pay',component:ProWalletPaymentComponent}
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: '**', redirectTo: 'login' }




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }

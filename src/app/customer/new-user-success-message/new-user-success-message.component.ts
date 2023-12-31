import { Component } from '@angular/core';

@Component({
  selector: 'app-new-user-success-message',
  templateUrl: './new-user-success-message.component.html',
  styleUrls: ['./new-user-success-message.component.css']
})
export class NewUserSuccessMessageComponent {

  transactionId : any

  constructor()
  {
    this.transactionId = sessionStorage.getItem("tid");
    console.log(this.transactionId);
  }
  

  home()
  {
    sessionStorage.removeItem("activatedUserDetail")
    sessionStorage.removeItem("firstplan")
    sessionStorage.removeItem("validity")
    sessionStorage.removeItem("price")
    sessionStorage.removeItem("tid")
  }

}

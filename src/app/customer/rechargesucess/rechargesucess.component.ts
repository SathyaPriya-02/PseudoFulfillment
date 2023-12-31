import { Component } from '@angular/core';

@Component({
  selector: 'app-rechargesucess',
  templateUrl: './rechargesucess.component.html',
  styleUrls: ['./rechargesucess.component.css']
})
export class RechargesucessComponent {

  transactionId : any

  constructor()
  {
    this.transactionId = sessionStorage.getItem("recharge-tid")
  }

}

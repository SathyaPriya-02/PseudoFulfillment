import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-walletcard',
  templateUrl: './walletcard.component.html',
  styleUrls: ['./walletcard.component.css']
})
export class WalletcardComponent {


  amountToAdd: any;
  phoneNumber: any;
  

  constructor(private route: ActivatedRoute,private uService : UserService,private router : Router) 
  {
    this.amountToAdd = sessionStorage.getItem('amountToAdd');
    this.phoneNumber = sessionStorage.getItem('phoneNumber');
  
  }

  ngOnInit(): void {
    // Use the retrieved values to update the wallet or perform other actions
    console.log('Amount to add to wallet:', this.amountToAdd);
    console.log('Phone number:', this.phoneNumber);
  }

  makePayment() {
    this.uService.addAmountToWallet(this.amountToAdd, this.phoneNumber).subscribe(() => {
      Swal.fire('Success', 'Amount added to your pro wallet', 'success').then(() => {
        // You can add any code here if you have specific actions to perform after the payment.
        // For example, navigate to another page.
        this.router.navigate(['/user']);
      });
      // You can add any code here if you have specific actions to perform after the payment.
    });
  }  

  cancelPayment()
  {
    const confirmCancel = window.confirm('Do you want to cancel the payment?');
    if (confirmCancel) {
    this.router.navigate(['/user']);
  }
  }
}

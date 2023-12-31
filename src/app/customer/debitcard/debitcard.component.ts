import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-debitcard',
  templateUrl: './debitcard.component.html',
  styleUrls: ['./debitcard.component.css']
})
export class DebitcardComponent {

  price: any;
  planname : any
  validity : any
  phonenumber : any
  username : any
  userDetails : any
  planSelected : any
  simnumber : any
  tid : any
  billdetails : any
  expiredate :any
  emailid: any;
  prowallet: any;
  dialog: any;
  isCheckboxChecked = false;
  amountToShow: number;
  originalWalletAmount: number;

  
  
  constructor(private router : Router ,private us : UserService) {
    this.userDetails = sessionStorage.getItem("loginUserDetails");
    if (this.userDetails) {
    this.userDetails = JSON.parse(this.userDetails);
    console.log(this.userDetails);
  // Rest of your code to access userDetails properties
}
    console.log(this.userDetails)
    this.phonenumber = this.userDetails.phonenumber
    this.username = this.userDetails.first_name
    this.simnumber = this.userDetails.simnumber
    this.emailid = this.userDetails.emailid
    this.prowallet = this.userDetails.prowallet
    console.log("walletttttttttttt"+this.prowallet)
    this.planSelected = sessionStorage.getItem("selectedPlan");

    if (this.planSelected) {
      this.planSelected = JSON.parse(this.planSelected);
      console.log(this.planSelected);
      // Rest of your code to access planSelected properties
    } 
    this.planname = this.planSelected.planname
    this.price = this.planSelected.price
    this.validity = this.planSelected.validity
    this.amountToShow = this.price;
    this.originalWalletAmount = this.prowallet;
  }

  

  makePayment()
  {
      this.us.recharge(this.username, this.emailid,this.simnumber,this.phonenumber,this.planname, this.price, this.validity).subscribe(
        (response)=> {this.tid = response ;
        console.log("tid"+this.tid)
        this.us.findByTid(this.tid).subscribe((response)=> {this.billdetails=response
          console.log(this.billdetails)
          this.username = this.billdetails.firstname
          this.phonenumber = this.billdetails.phonenumber
          this.planname = this.billdetails.planname
          this.price = this.billdetails.price
          this.validity = this.billdetails.validity
          this.expiredate = this.billdetails.expiredate
          this.emailid = this.billdetails.emailid
          this.userDetails.current_plan = this.planname; // Assuming `recievedData` contains the current plan
          this.userDetails.expire_date = this.expiredate
          sessionStorage.setItem("loginUserDetails", JSON.stringify(this.userDetails));

          this.us.generateBill(this.username,this.emailid,this.phonenumber,this.planname,this.price,this.validity,this.tid,this.expiredate).subscribe()
          sessionStorage.setItem("recharge-tid",this.tid)
          this.router.navigate(['/recharge-success']);
          this.us.updateWalletAmount(this.phonenumber, this.prowallet).subscribe()
        
        })  
      });
     

      
  }



// updateTotalAmount() {
//   // Replace with your actual wallet and recharge amounts
//   const rechargeAmount = this.price;
//   const walletAmount = this.prowallet;
//   console.log('Recharge Amount:', rechargeAmount);
//   console.log('Wallet Amount:', walletAmount);
//   this.isCheckboxChecked = true
//   if (this.isCheckboxChecked) {
//     // Checkbox is checked
//     if (walletAmount < rechargeAmount) { // Change this condition
//       // Wallet balance is insufficient, show an error message
//       Swal.fire({
//         icon: 'error',
//         title: 'Insufficient Balance',
//         text: 'Your wallet balance is insufficient. Please recharge your wallet.',
//         showCancelButton: false,
//         confirmButtonText: 'OK',
//       }).then((result) => {
//         if (result.isConfirmed) {
//           // Uncheck the checkbox
//           this.isCheckboxChecked = false;
//           // Reset the displayed amount to the original wallet amount
//           this.amountToShow = this.originalWalletAmount;
//         }
//       });
//     }
//   } else {
//     // Checkbox is unchecked, reset the displayed amount to the original wallet amount
//     this.amountToShow = this.originalWalletAmount;
//   }
// }


cancelPayment() {
  const confirmCancel = window.confirm('Do you want to cancel the payment?');
  if (confirmCancel) {
    this.router.navigate(['/user']);
  }
}

f(){
  console.log("hi")
}

}


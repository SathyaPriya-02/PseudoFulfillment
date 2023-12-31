import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-starterpage',
  templateUrl: './starterpage.component.html',
  styleUrls: ['./starterpage.component.css']
})
export class StarterpageComponent {

  showPlanDetails: boolean = false;
  phoneNumber : any
  activatedUserDetails : any

  constructor(private us : UserService , private router : Router){}
  handlePayment() {
   
    sessionStorage.setItem("firstplan","starter plan")
    sessionStorage.setItem("validity","60")
    sessionStorage.setItem("price","399")

    this.us.getUserDetail(this.phoneNumber).subscribe((response) => {
      this.activatedUserDetails = response;
  
      // Store user details in session storage
      sessionStorage.setItem("activatedUserDetail", JSON.stringify(this.activatedUserDetails));
  
      // Navigate to the payment page once you have the user details
      this.router.navigate(['/starter-pay']);
    });
  }

  activateAccount() {
    // Use this.phoneNumber to activate the account
    // Example: Send an HTTP request with this.phoneNumber to your backend for activation
    alert(`Activate account with phone number: ${this.phoneNumber}`);
  }
}

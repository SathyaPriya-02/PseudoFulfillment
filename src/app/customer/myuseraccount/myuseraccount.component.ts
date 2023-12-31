import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedsourceService } from 'src/app/service/sharedsource.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-myuseraccount',
  templateUrl: './myuseraccount.component.html',
  styleUrls: ['./myuseraccount.component.css']
})
export class MyuseraccountComponent  implements OnInit{

  userDetail : any ='';
  phoneNumber : any='';
  userdata : any
  recievedData : any;

  constructor(private uService: UserService , private sharedService: SharedsourceService,private router: Router) 
  {
      
      //this.phoneNumber = this.sharedService.getPhoneNumber(); // Get the phone number from the shared service
      //console.log(this.phoneNumber);
      //this.uService.getUserDetail(this.phoneNumber).subscribe((user: any) => {
        //this.userDetail = user;
        //localStorage.setItem("userdata",JSON.stringify(this.userDetail))
        //console.log(this.userDetail);
        //this.recievedData = this.userDetail
      //});
      
      const userDetailsString = sessionStorage.getItem("loginUserDetails");
      if (userDetailsString) {
        this.recievedData = JSON.parse(userDetailsString);
      } 
      
    
  }

  
    ngOnInit(): void {
      const storedData = sessionStorage.getItem("loginUserDetails");
      if(storedData)
      {
        this.recievedData = JSON.parse(storedData);
        console.log(this.recievedData)
      }
    } 

    amountToAdd: number = 0;

    isAddToWalletPopupOpen: boolean = false;
    
    
    
    addValueToProWallet() {
      console.log('addValueToProWallet function called');
    
      Swal.fire({
        title: 'Add to Wallet',
        input: 'text',
        inputPlaceholder: 'Enter the amount',
        inputAttributes: {
          type: 'number',
          step: '0.01', // Set the step to allow decimal values
        },
        showCancelButton: true,
        confirmButtonText: 'Pay',
        showLoaderOnConfirm: true,
        confirmButtonColor: 'red',
        preConfirm: (amount) => {
          console.log('Preconfirm callback called');
    
          // Store data in session storage
          sessionStorage.setItem('amountToAdd', amount);
          sessionStorage.setItem('phoneNumber', this.recievedData.phonenumber);
          const addedAmount = parseFloat(amount);
    
          // Update the wallet amount
          this.recievedData.prowallet += addedAmount;
    
          // Store the updated wallet amount in session storage
          sessionStorage.setItem('loginUserDetails', JSON.stringify(this.recievedData));
          
          return addedAmount; // Pass the added amount as the result of the promise
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.value) {
          // Navigate to the 'wallet-card' route
          this.router.navigate(['/wallet-card']);
        }
      });
    }
    
    
    
}

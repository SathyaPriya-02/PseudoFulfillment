import { Component } from '@angular/core';
import { requestusers } from 'src/app/model/requestusers';

import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-request',
  templateUrl: './requestpage.component.html',
  styleUrls: ['./requestpage.component.css']
})
export class RequestpageComponent {

      user : requestusers = new requestusers('','','','','','','','','','','');
      submitted: boolean = false;
      simCount: number=1;
      
      

      constructor(private uservice : UserService){}

      onSubmit()
      {
        console.log("Registered user"+this.user.emailid)
        //sending regisstered emailid to backend to send activation link in mail 
        this.uservice.sendMail(this.user.emailid).subscribe((response)=>
        { 
          //getting phonenumber and simnumber generated in backend
          this.user.phonenumber = response.phoneNumber;
          this.user.simnumber = response.simNumber;
          console.log("phn "+this.user.phonenumber);
          console.log("sim "+this.user.simnumber);
          //sending all the details to store in db
          this.uservice.addUser(this.user).subscribe((response)=>{this.submitted=true});
          console.log("Stored details "+this.user);
          console.log("hi")
        });
        Swal.fire({

          title: 'Registration Success',

          icon: 'success',

          showCancelButton: true,

          confirmButtonText: 'Return to Home',

          cancelButtonText: 'Login your account',

        }).then((result) => {

          if (result.isConfirmed) {

            // Handle the "Return to Home" action

            window.location.href = ''; // Replace '/home' with the actual URL of your home page.

          } else if (result.dismiss === Swal.DismissReason.cancel) {

            // Handle the "Login your account" action

            window.location.href = '/login'; // Replace '/login' with the actual URL of your login page.

          }

        });
      }


      getMaxDate(): string {
        const today = new Date();
        const year = today.getFullYear();
        const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = today.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      }

      // decreaseSimCount() {
      //   if (this.user.simCount > 0) {
      //     this.user.simCount--;
      //   }
      // }
      
      // increaseSimCount() {
      //   this.user.simCount++;
      // }
      

}

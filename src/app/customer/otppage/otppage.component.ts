import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-otppage',
  templateUrl: './otppage.component.html',
  styleUrls: ['./otppage.component.css']
})
export class OtppageComponent {
  constructor(public router:Router,private uService : UserService){}
 
  inputDigitLeft: string = "Verify code";
  btnStatus: string = "btn-light";
  phoneNumber: string = '';
  userEnteredOtp: string = '';
  userEnteredEmail:string='';
  

  public configOptions = {
    length: 6,
    inputClass: 'digit-otp',
    containerClass: 'd-flex justify-content-between'
  }
  
  var1=false
  var2=true
  onOtp(){
    this.var1=true
    this.var2=false
  }
  

  onOtpChange(event: any) {
    this.userEnteredOtp = event;
    //this.otp = event;
    if(this.userEnteredOtp.length < this.configOptions.length) {
      this.inputDigitLeft = this.configOptions.length - this.userEnteredOtp.length + " digits Left";
      this.btnStatus = 'btn-light';
    }

    if(this.userEnteredOtp.length == this.configOptions.length) {
      this.inputDigitLeft = "Let's go!";
      this.btnStatus = 'btn-primary';
    }
  }

  

  validateOtp() {

     const otpAndPhoneNumber = {
      otp : this.userEnteredOtp,
      phoneNumber: this.uService.phonenumber
    };
    console.log(otpAndPhoneNumber)
    this.uService.validateOtp(otpAndPhoneNumber).subscribe((valid) => {
      console.log('Response:', valid); // Log the valid value here
      if (valid) {
        
        this.redirectUserHomePage();

      } else {
        this.showInavlid();
      }

    });

    
}
redirectUserHomePage()
{
  this.router.navigate(['/user']);
}

showInavlid()
{
  Swal.fire({
    icon: 'error',
    title: 'Invalid OTP',
    text: 'The OTP entered is invalid. Please try again.'
  });
}
}



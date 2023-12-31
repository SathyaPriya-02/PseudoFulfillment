import { Injectable } from '@angular/core';
import { requestusers } from '../model/requestusers';
import{HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url : string ='http://localhost:9191'
  phonenumber : string = '';
  email:string='';
  searchResults: any;

  constructor(private httpClient:HttpClient) { }
  sendMail(email_id: string):Observable<any> 
  {
   return this.httpClient.post('http://localhost:9191/user/sendmail',email_id);
  }

  addUser(newUser : requestusers)
  {
    return this.httpClient.post('http://localhost:9191/user/newuser',newUser);
  }

  generateOtp(phoneNumber:string,email:string)
  {
    const body={phoneNumber,email}
    return this.httpClient.post('http://localhost:9191/requestotp',body)
  }

  validateOtp(otpAndPhoneNumber:any):Observable<Boolean> {
    
    return this.httpClient.post<Boolean>('http://localhost:9191/validateotp', otpAndPhoneNumber);

  }

  getUserDetail(phoneNumber : string)
  {
    
    return this.httpClient.get<requestusers>(`http://localhost:9292/user/detail/${phoneNumber}`);
  }
  

  getPlans()
  {
    return this.httpClient.get('http://localhost:9494/user/plan')
  }

  logout()
  {
    localStorage.removeItem("userdata");
    sessionStorage.removeItem("loginUserDetails")
    sessionStorage.removeItem("selectedPlan")
    sessionStorage.removeItem("tid")
    sessionStorage.removeItem("recharge-tid")
  }

  searchPlans(searchText : string)
  {
    return this.httpClient.get(`http://localhost:9494/user/searchplan/${searchText}`)
  }

  activateUser(firstName: string, simnumber : string ,phoneNumber: string,planName: string, price: number, validity: number) {
    const data = {
      simnumber : simnumber,
      userName: firstName,
      planname: planName,
      price: price,
      validity: validity
    };
  
    console.log( this.httpClient.post(`http://localhost:9191/user/activate/${phoneNumber}`, data));
    return this.httpClient.post(`http://localhost:9191/user/activate/${phoneNumber}`, data)
  }


  recharge(firstName: string, emailid : string, simnumber: string, phoneNumber: string, planName: string, price: number, validity: number) {
    const data = {
      simnumber: simnumber,
      userName: firstName,
      emailid : emailid,
      planname: planName,
      price: price,
      validity: validity
    };
    console.log(phoneNumber); // Use the parameter 'phoneNumber' here
    console.log(data);
    return this.httpClient.post(`http://localhost:9191/user/recharge/${phoneNumber}`, data);
  }
  
  findByTid(tid : string)
  {
    return this.httpClient.get(`http://localhost:9191/user/tid/${tid}`)
  }

  generateBill(firstName: string,emailid : string, phoneNumber: string, planName: string, price: number, validity: number,tid:string,expiredate:string)
  {
    const data = {

      phonenumber : phoneNumber,
      firstname: firstName,
      planname: planName,
      price: price,
      validity: validity,
      expiredate:expiredate,
      transactionid : tid
    };
    console.log(data)
    return this.httpClient.post(`http://localhost:9393/user/generate-bill/${emailid}`, data);
  }

  activateBill(firstName: string,emailid : string,simnumber:string, phoneNumber: string, planName: string, price: number, validity: number,tid:string)
  {
    const data = {

      phonenumber : phoneNumber,
      firstname: firstName,
      planname: planName,
      price: price,
      validity: validity,
      simnumber : simnumber,
      transactionid : tid
    };
    return this.httpClient.post(`http://localhost:9393/user/activation-bill/${emailid}`, data);
  }

  updateWalletAmount(phonenumber : string,prowallet : number)
  {
    return this.httpClient.post(`http://localhost:9292/user/updatewallet/${phonenumber}`, prowallet);
  }

  addAmountToWallet(amount: number, phonenumber: string): Observable<any> {
    const body = { amount: amount }; // Wrap the amount in an object with a property 'amount'
    return this.httpClient.post(`http://localhost:9292/user/addtowallet/${phonenumber}`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  
}



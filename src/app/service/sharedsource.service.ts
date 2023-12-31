import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedsourceService {

  private phoneNumber: string = '';

  setPhoneNumber(phoneNumber: string) {
    this.phoneNumber = phoneNumber;
  }

  getPhoneNumber(): string {
    return this.phoneNumber;
  }
}

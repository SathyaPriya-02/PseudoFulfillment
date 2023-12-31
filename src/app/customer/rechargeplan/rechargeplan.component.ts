import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-rechargeplan',
  templateUrl: './rechargeplan.component.html',
  styleUrls: ['./rechargeplan.component.css'],
})
export class RechargeplanComponent {
  plans: any;
  searchText: any;
  searchResults: any[] = [];
  selectedPlan: any;
  

  constructor(private uService: UserService, private router: Router) {
    this.uService.getPlans().subscribe((planlist: any) => {
      this.plans = planlist;
      console.log(this.plans);
    });
  }

  onPay(plan: any) {
    this.selectedPlan = plan;
    console.log(this.selectedPlan)
    // Store the selected plan in session storage
    sessionStorage.setItem('selectedPlan', JSON.stringify(this.selectedPlan));
    this.router.navigate(['/debit-card']);
  }
  onWallet(plan:any)
  {
    this.selectedPlan = plan;
    sessionStorage.setItem('selectedPlan', JSON.stringify(this.selectedPlan));
    this.router.navigate(['/wallet-pay']);
  }
  onSubmit() {
    this.uService.searchPlans(this.searchText).subscribe((result: any) => {
      this.searchResults = result;
      //localStorage.setItem('plandata', JSON.stringify(result));
      console.log(this.searchResults)
    });
  }

  isDropdownOpen = false; // Add this variable to track dropdown state

  // ...

  // Function to toggle the dropdown
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  
  

  
}

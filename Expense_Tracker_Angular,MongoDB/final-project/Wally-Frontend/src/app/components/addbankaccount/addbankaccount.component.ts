import { Component, OnInit } from '@angular/core';
import {userCreditCard} from '../model/user.creditcard.model';
import {UserService} from '../service/user.service';
import { Router } from '@angular/router';
import { AuthService} from '../service/auth.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';

import {
	ToastrService
} from 'ngx-toastr';

@Component({
  selector: 'app-addbankaccount',
  templateUrl: './addbankaccount.component.html',
  styleUrls: ['./addbankaccount.component.scss']
})
export class AddBankAccountComponent implements OnInit {
  loggedInStatus :boolean;
  creds = JSON.parse(localStorage.getItem('user'));
  name = this.creds.userName;
  constructor(private toastr: ToastrService, private userService: UserService, private router: Router, private authservice: AuthService) {

    if(this.creds){
      this.loggedInStatus = true;
      }
  }
  // myControl = new FormControl();
  // options: string[] = ['One', 'Two', 'Three'];
  // filteredOptions: Observable<string[]>;
  ngOnInit() {
    // this.filteredOptions = this.myControl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => this._filter(value))
    //   );
  }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.options.filter(option => option.toLowerCase().includes(filterValue));
  // }
  createAccount(val:any) {
    if(this.name != undefined){
    //alert("form submitted"+ val.accountType+ this.name);
      if(val.bankName  != undefined && val.accountType  != undefined && val.bankUserName  != undefined && val.bankPassword  != undefined){
        this.userService.getAccountData().subscribe(accountData => {
          console.log(accountData);
          if(!this.existingAccountCheck(accountData, val.bankName, val.accountType)){
            var usercreditcard = new userCreditCard(
              //var someDate = new Date('01/05/2019');
              //someDate.setDate(someDate.getDate() + 10);
              this.name, val.bankName, val.accountType, val.bankUserName, val.bankPassword, new Date('12/11/2019'),
              //null
              [{
                category : 'Bills & Utilities', //grocery,transport, shopping
                date : new Date(),
                description: 'Miscellaneous', //place of transaction
                amount: val.accountType == 'Credit Card' ? -Math.floor(Math.random() * (Math.ceil(-2000) - Math.ceil(-1000))) + Math.ceil(-1000):
                            Math.floor(Math.random() * (Math.ceil(2000) - Math.ceil(1000))) + Math.ceil(1000)
              }]);
              //alert("form data"+ usercreditcard);
              this.showToaster(true, val.bankName +" "+ val.accountType +" account added successfully!!");
              this.userService.createBankAcc(usercreditcard)
              .subscribe(
                data => this.router.navigate(['/dashboard'])
              );
          }else{
            this.showToaster(false, "Account already added");
          }
        });

      }else{
        this.showToaster(false, undefined);
      }
   }
   else{
    this.showToaster(false, "Please login to enter your card details");
   }
  }
  existingAccountCheck(list: any, newBankName: String, newAccountType: String) {
    let total = 0;
    if (list.length > 0) {
      for (let i = 0; i < list.length; i++) {
        if(list[i].bankName == newBankName && list[i].accountType == newAccountType){
          return true;
        }
      }
    }
    return false;
  }
  showToaster(val:boolean, msg: string) {
		if (val) {
			this.toastr.success(msg || "Account added");
		} else {
			this.toastr.warning(msg || "Please enter all the fields")
		}
	}
}

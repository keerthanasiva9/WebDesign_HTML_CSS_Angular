import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user){
    //alert("inside validate blank");
    if(user.firstName==undefined || user.lastName==undefined || user.userName==undefined ||user.password==undefined){
      //alert("Please enter all the fields.");
      return false;
    }
    else {
      return true;

    }

  }

  validateEmail(email){
    //alert("inside validate email");
    const re =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(email)){
     // alert("Email is not correct.");
      return false;
    }
    else{
      return true;
    }

  }

 }



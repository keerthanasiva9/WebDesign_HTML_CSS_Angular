import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  find(val:any) {
   // alert("inise login service find method " + JSON.stringify(val));
    return this.http.post('http://localhost:3000' + '/users/login' , val );
  }

}

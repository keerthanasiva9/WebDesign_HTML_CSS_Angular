import { User } from './../model/user.model';
import { Component, OnInit } from '@angular/core';
import { AuthService} from '../service/auth.service';
import {Router} from '@angular/router';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  creds:User = JSON.parse(localStorage.getItem('user'));
  loggedInStatus :boolean = false;

  constructor(private authservice: AuthService, private router: Router, private userService: UserService) {
    if(this.creds){
      this.loggedInStatus = true;
    }
   }

  ngOnInit() {
  }

  onLogoutClick(){

    this.authservice.logout();
    console.log('You are logged out!');
    //location.reload();
    this.router.navigate(['/login']);

    return false;

  }

  deleteUser(userName: string) {
    this.userService.delete(userName).subscribe(deletedMessage => {
        console.log("User Deleted");
    })
    this.onLogoutClick();

  }



}


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  loggedInStatus :boolean;
  creds = JSON.parse(localStorage.getItem('user'));

  constructor() {
    if(this.creds){
      this.loggedInStatus = true;
    }
   }

  ngOnInit() {
  }

}

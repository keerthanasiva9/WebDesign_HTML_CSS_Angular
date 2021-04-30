import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {

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

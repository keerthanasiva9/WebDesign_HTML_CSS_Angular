import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-howitworks',
  templateUrl: './howitworks.component.html',
  styleUrls: ['./howitworks.component.scss']
})
export class HowitworksComponent implements OnInit {
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

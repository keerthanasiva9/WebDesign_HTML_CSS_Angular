import {
	Component,
	OnInit
} from '@angular/core';

@Component({
	selector: 'app-blog',
	templateUrl: './blog.component.html',
	styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  loggedInStatus: boolean;
	creds = JSON.parse(localStorage.getItem('user'));

	constructor() {
		if (this.creds) {
			this.loggedInStatus = true;
		}
	}
	ngOnInit() {}
}
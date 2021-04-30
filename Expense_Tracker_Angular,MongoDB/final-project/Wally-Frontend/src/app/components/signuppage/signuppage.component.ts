import {
	Component,
	OnInit
} from '@angular/core';
import {
	UserService
} from '../service/user.service';
import {
	Router
} from '@angular/router';

import {
	User
} from '../model/user.model';
import {
	ValidateService
} from '../service/validate.service';
import {
	AuthService
} from '../service/auth.service';
import {
	ToastrService
} from 'ngx-toastr';

@Component({
	selector: 'app-signuppage',
	templateUrl: './signuppage.component.html',
	styleUrls: ['./signuppage.component.scss']
})
export class SignuppageComponent implements OnInit {
	model: any;
	constructor(private toastr: ToastrService, private userService: UserService, private router: Router, private validateService: ValidateService, private authService: AuthService) {}
	ngOnInit() {}
	createUser(val: any) {
    console.log('Hi');
		var user = new User(

			val.firstName,
			val.lastName,
			val.userName,
			val.password
		);
		//required fields
		if (!this.validateService.validateRegister(user)) {
      console.log('Hi');
			this.showToaster(false, "Please fill in all fields!");
			return false;
		}

		//validate email
		if (!this.validateService.validateEmail(user.userName)) {
			this.showToaster(false, 'Please enter a valid email!');
			return false;
		}
		this.authService.authenticateUser(user).subscribe((data: any) => {
			var temp = {};
			if (data.success) {
				this.showToaster(true, "You already have an account. Please login!");
				this.router.navigate(['/login']);
			} else {
				// register user
				this.authService.registerUser(user).subscribe(data => {
					console.log(' reroute registration');
					if (data) {
						this.showToaster(true, 'You are now registered and can log in !');
						this.router.navigate(['/login']);

					} else {
						this.showToaster(false, 'Account creation failed!');
						this.router.navigate(['/signup']);

					}
				});
			}
		});


	}
	showToaster(val, msg) {
		if (val == true) {
			this.toastr.success(msg || "Error");
		} else {
			this.toastr.warning(msg || "Success")
		}
	}
}

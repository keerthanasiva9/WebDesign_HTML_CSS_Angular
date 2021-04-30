import {
	Component,
	OnInit
} from '@angular/core';
import {
	Router
} from '@angular/router';
import {
	LoginService
} from '../service/login.service';
import {
	AuthService
} from '../service/auth.service';
import {
	ToastrService
} from 'ngx-toastr';
import {
	ToastrModule
} from 'ngx-toastr';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	constructor(private toastr: ToastrService, private loginService: LoginService, private router: Router, private authService: AuthService) {}

	ngOnInit() {}
	findUser(val: any) {
		const user = {
			userName: val.userName,
			password: val.password
		}
		this.authService.authenticateUser(user).subscribe((data: any) => {
			var temp = {};
			if (data.success) {
				this.authService.storeUserData(data.token, data.user);
				this.showToaster(true, "Hello, Welcome "+data.user.firstName +" "+data.user.lastName);
				this.router.navigate(['dashboard']);
			} else {
				this.showToaster(false, 'Wrong credentials or you are not registered!');
				this.router.navigate(['login']);
				console.log(data);
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

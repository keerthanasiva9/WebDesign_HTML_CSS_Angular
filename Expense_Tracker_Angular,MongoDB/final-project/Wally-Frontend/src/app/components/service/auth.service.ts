import {
	Injectable
} from '@angular/core';
import {
	HttpClient,
	HttpHeaders
} from '@angular/common/http';
import {
	map
} from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	authToken: any;
	user: any;
	isloggedIn: boolean = false;
	constructor(private http: HttpClient) {}

	registerUser(user) {
		let headers = new HttpHeaders();
		headers.append('Content-Type', 'application/json');
		return this.http.post('http://localhost:3000' + '/users', user, {
			headers: headers
		});
	}

	authenticateUser(user) {
		let headers = new HttpHeaders();
		headers.append('Content-Type', 'application/json');
		var res = this.http.post('http://localhost:3000/users/auth', user, {
			headers: headers
		});
		return res;
	}

	storeUserData(token, user) {
		this.isloggedIn = true;
		localStorage.setItem('id_token', token);
		localStorage.setItem('user', JSON.stringify(user));
		this.authToken = token;
		this.user = user;
	}

	logout() {
		this.authToken = null;
		this.user = null;
		localStorage.clear();
	}
}

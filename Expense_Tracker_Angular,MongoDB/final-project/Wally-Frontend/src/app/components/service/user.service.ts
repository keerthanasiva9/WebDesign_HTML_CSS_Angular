import {
	Injectable
} from '@angular/core';
import {
	User
} from '../model/user.model';
import {
	HttpClient,
	HttpResponse
} from '@angular/common/http';
import {
	map
} from 'rxjs/operators';
import {
	userCreditCard
} from '../model/user.creditcard.model';
import {
	Observable
} from 'rxjs';
import {
	userBudget
} from '../model/user.budget.model';

@Injectable({
	providedIn: 'root'
})

export class UserService {

	creds = JSON.parse(localStorage.getItem('user'));
  name = this.creds && this.creds.userName;



	constructor(private http: HttpClient) {}

	create(user: User) {
    console.log(user);
		return this.http.post('http://localhost:3000/users', user);
	}

	getAccountData(): Observable < any > {
		// alert("get card details of users" + this.creds + this.name);
		var res = this.http.get('http://localhost:3000/creditcard/' + this.name);
		return res;
  }
  getUser(): Observable < any > {
		// alert("get card details of users" + this.creds + this.name);
		var res = this.http.get('http://localhost:3000/users/' + this.name);
		return res;
	}

	createBankAcc(usercreditCard: userCreditCard) {
		//alert("in service"+ usercreditCard);
		return this.http.post('http://localhost:3000' + '/creditcard', usercreditCard);
	}

	createBudget(userBudget: userBudget) {
		return this.http.post('http://localhost:3000' + '/addbudget', userBudget);
	}

	getBudgetData(): Observable < any > {
		// alert("get card details of users" + this.creds + this.name);
		var res = this.http.get('http://localhost:3000/getbudget/' + this.name);
		return res;
  }

  delete(userName: string): Observable < any > {
		alert("get card details of users" + userName);
		var res = this.http.delete('http://localhost:3000/users/' + userName);
		return res;
  }

}

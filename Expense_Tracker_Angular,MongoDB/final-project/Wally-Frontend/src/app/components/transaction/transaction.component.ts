import {
	Component,
	OnInit
} from '@angular/core';
import {
	NgbModal,
	ModalDismissReasons
} from '@ng-bootstrap/ng-bootstrap';
import {
	UserService
} from '../service/user.service';
import {
	Router
} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {
	Sort,
	MatInputModule,
	MatSortModule,
    MatTableModule,
	MatFormFieldModule,
	PageEvent
} from '@angular/material';
import {
	BrowserAnimationsModule
} from '@angular/platform-browser/animations';
//import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
	selector: 'app-transaction',
	templateUrl: './transaction.component.html',
	styleUrls: ['./transaction.component.scss']
})

export class TransactionComponent implements OnInit {
	ELEMENT_DATA = [
		{bankName: 1}
	];
	displayedColumns: string[] = ['date', 'description', 'category', 'bankName', 'amount'/*, 'details', 'update', 'delete'*/];
	dataSource = [];
	loggedInStatus: boolean;
	creds = JSON.parse(localStorage.getItem('user'));

	creditcardlist: Array < any > = [];
	transactions: Array < any > = [];
	totalHome: any = 0.0;
	totalAuto: any = 0.0;
	totalBusiness: any = 0.0;
	totalUtilities: any = 0.0;
	totalEducation: any = 0.0;
	totalEntertainment: any = 0.0;
	totalFees: any = 0.0;
	totalFood: any = 0.0;
	totalHealth: any = 0.0;
	totalShopping: any = 0.0;
	weHaveTransactions = false;

	categoryList = ['Home', 'Auto & Transport', 'Business Services', 'Bills & Utilities',
		'Education', 'Entertainment', 'Fees & Charges', 'Food & Dining', 'Health & Fitness', 'Shopping'
	];
	constructor(private userService: UserService, private router: Router) {
		if (this.creds) {
			this.loggedInStatus = true;
		}
	}

	ngOnInit() {
		let total = 0;
		this.userService.getAccountData().subscribe(accountData => {
			console.log(accountData);
			this.intialisecreditcardList(accountData);
			this.dataSource = []
			if (this.creditcardlist.length > 0) {
				for (let i = 0; i < this.creditcardlist.length; i++) {
					var transactions = this.creditcardlist[i].transactions
					if (transactions && transactions.length > 0) {
						this.weHaveTransactions = true;
						var bankName = this.creditcardlist[i].bankName;
						for (let j = 0; j < transactions.length; j++) {
							transactions[j].bankName = bankName;
							this.transactions.push(transactions[j]);
							var category = transactions[j].category;
							var amount = transactions[j].amount;
							var obj = {
								bankName: transactions[j].bankName || this.creditcardlist[i].bankName,
								amount: amount,
								category: category,
								date: transactions[j].date,
								description: transactions[j].description
							}
							this.dataSource.push(obj);

							this.intialiseCategoryLists(category, amount, true);
						}
					}
				}
			}
		});
	}
	private intialisecreditcardList(accountData: any) {
		for (let i = 0; i < accountData.length; i++) {
			if (accountData[i].accountType == "Credit Card") {
				this.creditcardlist.push(accountData[i]);
			}
		}
	}
	intialiseCategoryLists(category: any, amount: any, sameMonth: boolean) {
		if (category == this.categoryList[0] && sameMonth) {
			this.totalHome += amount;
		} else if (category == this.categoryList[1] && sameMonth) {
			this.totalAuto += amount;
		} else if (category == this.categoryList[2] && sameMonth) {
			this.totalBusiness += amount;
		} else if (category == this.categoryList[3] && sameMonth) {
			this.totalUtilities += amount;
		} else if (category == this.categoryList[4] && sameMonth) {
			this.totalEducation += amount;
		} else if (category == this.categoryList[5] && sameMonth) {
			this.totalEntertainment += amount;
		} else if (category == this.categoryList[6] && sameMonth) {
			this.totalFees += amount;
		} else if (category == this.categoryList[7] && sameMonth) {
			this.totalFood += amount;
		} else if (category == this.categoryList[8] && sameMonth) {
			this.totalHealth += amount;
		} else if (category == this.categoryList[9] && sameMonth) {
			this.totalShopping += amount;
		}
	}

	sortData(sort: Sort) {
		const data = this.dataSource.slice();
		if (!sort.active || sort.direction === '') {
			this.transactions = data;
			return;
		}
		this.dataSource = data.sort((a, b) => {
			const isAsc = sort.direction === 'asc';
			switch (sort.active) {
				case 'date':
					return this.compare(a.date, b.date, isAsc);
				case 'bankname':
					return this.compare(a.bankname, b.bankname, isAsc);
				case 'category':
					return this.compare(a.category, b.category, isAsc);
				case 'description':
					return this.compare(a.description, b.description, isAsc);
				case 'amount':
					return this.compare(a.amount, b.amount, isAsc);
				default:
					return 0;
			}
		});
	}

	compare(a: number | string, b: number | string, isAsc: boolean) {
		return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
	}
	doFilter = (value: string) => {
		//const data = this.transactions.slice();
		//this.dataSource.filter = value.trim().toLocaleLowerCase();
	  }
	public redirectToDetails = (id: string) => {

	}

	public redirectToUpdate = (id: string) => {

	}

	public redirectToDelete = (id: string) => {
	  console.log(id);
	}
}


import {
	Component,
	OnInit,
  ViewChild,
  Injectable,
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
import {
	Observable
} from 'rxjs';
import {
	Chart
} from 'chart.js';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

	creds: string = JSON.parse(localStorage.getItem('user'));
	loggedInStatus: boolean = false;

	creditcardList: Array < any > = [];
	cashList: Array < any > = [];
	investmentList: Array < any > = [];
	loanList: Array < any > = [];
	retirementList: Array < any > = [];

	dueBillsList;

	totalCashBal = 0.0;
	totalCreditCardBal: any = 0.0;
	totalInvestmentBal: any = 0.0;
	totalRetirementBal = 0.0;
	totalLoanBal: any = 0.0;
	totalBal: any = 0.0;
	weHaveCards = false;
	weHaveTransactions = false;

	public pieChartLabels: string[] = ['Cash', 'Credit Debt', 'Investment', 'Retirement', 'Loan'];
	public pieChartData: number[] = [];
	public pieChartColor: any = [{
		backgroundColor: [
			'rgba(139, 136, 0, 0.9)',
			'rgb(205,92,92)',
			'rgba(255,165,0,0.9)',
			'rgb(250,250,210)',
			'rgb(175,238,238)'
		]
	}]
	public pieChartType: string = 'pie';

	// bar chart
	monthNames = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];
	public barChartLabels: string[] = this.monthNames;
	public barChartData: any[] = [];
	public barChartType: string = 'bar';
	public barChartColor: any = [{
		backgroundColor: 'rgba(139, 136, 0, 0.9)'
	}, {
		backgroundColor: 'rgb(205,92,92)'
	}]

	public lineChartLabels: string[] = this.monthNames;
	public lineChartData: number[] = [];
	public lineChartOptions = {
		legend: {
		   display: false
		},
		tooltips: {
		   enabled: true
		}
	  };
	public lineChartType: string = 'line';


	monthlyCash = {};
	monthlyCreditDebt = {};
	monthlyInvestment = {};

	constructor(private userService: UserService, private router: Router) {
		if (this.creds) {
			this.loggedInStatus = true;
		}
	}
	ngOnInit() {
		this.userService.getAccountData().subscribe(accountData => {
			console.log(accountData);
			this.intialiseLists(accountData);
			this.intialiseDueBillsList(this.creditcardList);
			this.totalCashBal = this.intialiseBalancePerAccountType(this.cashList);
			this.totalCreditCardBal = this.intialiseBalancePerAccountType(this.creditcardList);
			this.totalInvestmentBal = this.intialiseBalancePerAccountType(this.investmentList);
			this.totalRetirementBal = this.intialiseBalancePerAccountType(this.retirementList);
			this.totalLoanBal = this.intialiseBalancePerAccountType(this.loanList);

			this.totalBal = this.totalCashBal + this.totalCreditCardBal + this.totalInvestmentBal + this.totalRetirementBal + this.totalLoanBal;
			this.initialiseChart();
		});
	}
		private intialiseDueBillsList(list: any) {
			let total = 0;
			if (list.length > 0) {
				this.dueBillsList = [];
				var currentDate = new Date();
				for (let i = 0; i < list.length; i++) {
					let accBalance = 0;
					var dueDate = new Date(list[i].billDueDate)
					if (dueDate>= currentDate) {
						this.dueBillsList.push(list[i]);
					}
				}
			}
		}
	private intialiseLists(accountData: any) {
		for (let i = 0; i < accountData.length; i++) {
			this.weHaveCards = true;
			var currItem = accountData[i];
			var acctype = currItem.accountType
			var transactions = currItem.transactions;
			if(transactions){
				this.weHaveTransactions = true;
			}
			if (acctype == "Cash") {
				this.cashList.push(currItem);
			} else if (acctype == "Credit Card") {
				this.creditcardList.push(currItem);
			} else if (acctype == "Investment") {
				this.investmentList.push(currItem);
			} else if (acctype == "Retirement") {
				this.retirementList.push(currItem);
			} else if (acctype == "Loan") {
				this.loanList.push(currItem);
			}
		}
	}

	private intialiseBalancePerAccountType(list: any) {
		let total = 0;
		if (list.length > 0) {
			for (let i = 0; i < list.length; i++) {
				let accBalance = 0;
				if (list[i].transactions) {
					for (let j = 0; j < list[i].transactions.length; j++) {
						accBalance += list[i].transactions[j].amount;
					}
					list[i].accBalance = accBalance; // total bofa balance
					total += accBalance; // total checking accounts balance
				} else {
					list[i].accBalance = 0.00;
				}
			}
		}
		return total;
	}
	intialiseMonthlyLists(list: any) {
		if (list.length > 0) {
			var wehavedata = false;
			var monthlyObject = {
				"January": 0,
				"February": 0,
				"March": 0,
				"April": 0,
				"May": 0,
				"June": 0,
				"July": 0,
				"August": 0,
				"September": 0,
				"October": 0,
				"November": 0,
				"December": 0
			};
			for (let i = 0; i < list.length; i++) {
				var transactions = list[i].transactions;
				if (transactions) {
					wehavedata = true;
					for (let j = 0; j < transactions.length; j++) {
						var amount = transactions[j].amount;
						var monthFull = this.getMonthFullName(transactions[j].date);
						monthlyObject[monthFull] += amount
					}
				}
			}
			if(wehavedata){
				return monthlyObject;
			}
		}

	};
	initialiseChart() {
		// if(this.totalCashBal > 0 || this.totalCreditCardBal > 0 ||  this.totalInvestmentBal > 0 ||  this.totalRetirementBal > 0 ||  this.totalLoanBal > 0){
		// 	this.weHaveBalance
		// }
		this.pieChartData = [this.totalCashBal, this.totalCreditCardBal, this.totalInvestmentBal, this.totalRetirementBal, this.totalLoanBal];

    	// bar chart
		this.monthlyCash = this.intialiseMonthlyLists(this.cashList);
		this.monthlyCreditDebt = this.intialiseMonthlyLists(this.creditcardList);
		this.monthlyInvestment = this.intialiseMonthlyLists(this.investmentList);

		var data1 = [];
		var data2 = [];
		for (var i = 0; i < this.monthNames.length; i++) {
			this.monthlyCash && data1.push(this.monthlyCash[this.monthNames[i]]);
		}
		for (var i = 0; i < this.monthNames.length; i++) {
			this.monthlyCreditDebt && data2.push(-this.monthlyCreditDebt[this.monthNames[i]]);
		}
		this.barChartData = [{
				data: data1 || [],
				label: 'Cash Available'
			},
			{
				data: data2 || [],
				label: 'Credit Debt'
			}
		];

		for (var i = 0; i < this.monthNames.length; i++) {
			this.monthlyInvestment && this.lineChartData.push(this.monthlyInvestment[this.monthNames[i]]);
		}

	};

	getMonthFullName(iDate: any) {
		var date = new Date(iDate);
		var month = date.getMonth();
		return new Intl.DateTimeFormat('en-US', {
			month: 'long'
		}).format(date);
	}
	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}
}

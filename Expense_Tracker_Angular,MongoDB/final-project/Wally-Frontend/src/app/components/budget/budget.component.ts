import {
	Component,
	OnInit
} from '@angular/core';
import {
	UserService
} from '../service/user.service';
import {
	CommonService
} from '../service/common.service';
import {
	Router
} from '@angular/router';
import {
	AuthService
} from '../service/auth.service'
import {
	userBudget
} from '../model/user.budget.model';
import {
	DashboardComponent
} from '../dashboard/dashboard.component';
import {
	Chart
} from 'chart.js';
import {
	ToastrService
} from 'ngx-toastr';

@Component({
	selector: 'app-budget',
	templateUrl: './budget.component.html',
	styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
	loggedInStatus: boolean;
	creds = JSON.parse(localStorage.getItem('user'));
	name = this.creds.userName;

	creditcardlist: Array < any > = [];
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
	wehaveCurrentMonthTransactions=false;
  monthlyCreditDebt = {
    "January":0, "February":0, "March":0, "April":0, "May":0, "June":0,
    "July":0, "August":0, "September":0, "October":0, "November":0, "December":0
  };

	monthNames = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];
	currentMonth: any = new Date().getMonth();
	monthName: any = this.monthNames[this.currentMonth];
	mybudgetavailable: boolean = false;
	mybudget: any = 0.0;
	overBudgetStatus: string;
	totalExpenditure: any = 0.0;
	monthlyBudget = {};
	categoryList = ['Home', 'Auto & Transport', 'Business Services', 'Bills & Utilities',
		'Education', 'Entertainment', 'Fees & Charges', 'Food & Dining', 'Health & Fitness', 'Shopping'
	];
	public pieChartLabels: string[] = this.categoryList;
	public pieChartData: number[] = [];
	public pieChartColor: any = [{
		backgroundColor: [
			'rgba(30, 169, 224, 0.8)',
			'rgba(255,165,0,0.9)',
			'rgba(210,105,30)',
			'rgba(255, 161, 181, 0.9)',
			'rgba(255,215,0)',
			'rgb(205,92,92)',
			'rgba(189,183,107)',
			'rgb(250,250,210)',
			'rgb(175,238,238)'
		]
	}]
  public pieChartType: string = 'pie';
  public pieChartOptions = {
    legend: {
       display: false
    },
    tooltips: {
       enabled: true
    }
  };

	public barChartLabels: string[] = this.monthNames;
	public barChartData: any[] = [];
  public barChartType: string = 'bar';
  public barChartColor: any = [{
		backgroundColor: 'rgb(175,238,238)'
	},{
    backgroundColor: 'rgb(205,92,92)'
  }]

	constructor(private toastr: ToastrService, private userService: UserService, private router: Router, private authservice: AuthService,
		private userAccountData: DashboardComponent, private commonService: CommonService) {
		if (this.creds) {
			this.loggedInStatus = true;
		}
	}
	ngOnInit() {

		this.userService.getBudgetData().subscribe(budgetData => {
			console.log(budgetData);
			for (let i = 0; i < budgetData.length; i++) {
				if (budgetData[i].month == this.monthName) {
					this.mybudgetavailable = true;
					this.mybudget = budgetData[i].userBudget;
				}
				this.monthlyBudget[budgetData[i].month] = budgetData[i].userBudget
			}

			this.userService.getAccountData().subscribe(accountData => {
				console.log(accountData);
				this.intialiseCreditLists(accountData);
				this.calculateTransactions(this.creditcardlist);
				this.overBudgetStatus = this.totalExpenditure > this.mybudget ? "Over Budget" : "On Track";
				this.pieChartData = [
					-this.totalHome,
					-this.totalAuto,
					-this.totalBusiness,
					-this.totalUtilities,
					-this.totalEducation,
					-this.totalEntertainment,
					-this.totalFees,
					-this.totalFood,
					-this.totalHealth,
					-this.totalShopping
				];
        var data1 = [];
        var data2 = [];
				for (var i = 0; i < this.monthNames.length; i++) {
					data1.push(this.monthlyBudget[this.monthNames[i]]);
        }
        for (var i = 0; i < this.monthNames.length; i++) {
          data2.push(-this.monthlyCreditDebt[this.monthNames[i]]);
        }
				this.barChartData = [{
						data: data1,
						label: 'Monthly Budget'
					},
					{
						data: data2,
						label: 'Monthly Expenditure'
					}
				];
			});
		});
	}

	private intialiseCreditLists(accountData: any) {
		for (let i = 0; i < accountData.length; i++) {
			if (accountData[i].accountType == "Credit Card") {
				this.creditcardlist.push(accountData[i]);
			}
		}
	}

	private calculateTransactions(creditcardlist: any) {

		if (creditcardlist.length > 0) {
			for (let i = 0; i < creditcardlist.length; i++) {
				let accBalance = 0;
				var transactions = creditcardlist[i].transactions;
				if (transactions) {
					for (let j = 0; j < transactions.length; j++) {
						var category = transactions[j].category;
						var amount = transactions[j].amount;
						var monthFull = this.getMonthFullName(transactions[j].date);
						var sameMonth = monthFull == this.monthName;
						if(sameMonth){
							this.wehaveCurrentMonthTransactions = true;
						}
            this.intialiseCategoryLists(category, amount, sameMonth);
            this.monthlyCreditDebt[monthFull] += amount
					}
				}
			}
			this.totalExpenditure =
				this.totalHome +
				this.totalAuto +
				this.totalBusiness +
				this.totalUtilities +
				this.totalEducation +
				this.totalEntertainment +
				this.totalFees +
				this.totalFood +
				this.totalHealth +
				this.totalShopping
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
	getMonthFullName(iDate: any) {
		var date = new Date(iDate);
		var month = date.getMonth();
		return new Intl.DateTimeFormat('en-US', {
			month: 'long'
		}).format(date);
	}
	addBudget(val: any) {
		//alert("user"+ this.userAccountData.totalCredit) ;
		//alert("inside tool"+ JSON.stringify(val));
		if (this.creds != "undefined") {
			var budget = new userBudget(
				this.name,
				val.month,
				val.budget,
			);
			//alert("inside tool" + JSON.stringify(budget));
			this.userService.createBudget(budget)
				.subscribe(
					data => {
						if (data) {
							this.showToaster(true, "Budget saved !")
							this.router.navigate(['/dashboard'])
						} else if (!data) {
							this.showToaster(false, "Budget already saved for this month !")
						}
					}
				);
		} else {
			this.showToaster(false, "User is invalid");
		}
	}
	showToaster(val:boolean, msg: string) {
		if (val) {
			this.toastr.success(msg || "Account added");
		} else {
			this.toastr.warning(msg || "Please enter all the fields")
		}
	}
}

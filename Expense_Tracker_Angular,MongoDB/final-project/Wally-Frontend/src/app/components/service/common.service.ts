import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  categoryList = ['Home', 'Auto & Transport', 'Business Services', 'Bills & Utilities',
  'Education', 'Entertainment', 'Fees & Charges', 'Food & Dining', 'Health & Fitness', 'Shopping'];
  constructor() { }
}

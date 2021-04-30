import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { FaqComponent } from './components/faq/faq.component';
import { SignuppageComponent } from './components/signuppage/signuppage.component';
import { HowitworksComponent } from './components/howitworks/howitworks.component';
import { ContactComponent } from './components/contact/contact.component';
import { BlogComponent } from './components/blog/blog.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { DashboardComponent } from '../app/components/dashboard/dashboard.component';
import { BudgetComponent } from './components/budget/budget.component';
import { AddBankAccountComponent } from './components/addbankaccount/addbankaccount.component';
import { TransactionComponent } from '../app/components/transaction/transaction.component';
import { PressComponent } from './components/press/press.component';
import { SecurityComponent } from './components/security/security.component';
import { PartnersComponent } from './components/partners/partners.component';
import { JointeamComponent } from './components/jointeam/jointeam.component';
import { ResetComponent } from './components/reset/reset.component';
import { TermsComponent } from './components/terms/terms.component';



const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'howitworks', component: HowitworksComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '', pathMatch: 'full', redirectTo: 'signup' },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'signup', component: SignuppageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'budget', component: BudgetComponent },
  { path: 'addAccount', component: AddBankAccountComponent },
  { path: 'transaction', component: TransactionComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'press', component: PressComponent },
  { path: 'security', component: SecurityComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'press', component: PressComponent },
  { path: 'partners', component: PartnersComponent },
  { path: 'jointeam', component: JointeamComponent },
  { path: 'resetpassword', component: ResetComponent }//beforelogin service
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

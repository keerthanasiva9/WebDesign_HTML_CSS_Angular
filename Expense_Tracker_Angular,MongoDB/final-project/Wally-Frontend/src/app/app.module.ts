import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import {MatInputModule, MatSortModule, MatTableModule, MatIconModule, MatFormFieldModule} from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { PressComponent } from './components/press/press.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { ContactComponent } from './components/contact/contact.component';
import { FaqComponent } from './components/faq/faq.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignuppageComponent } from './components/signuppage/signuppage.component';
import { HowitworksComponent } from './components/howitworks/howitworks.component';
import { BlogComponent } from './components/blog/blog.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PiechartComponent } from './components/piechart/piechart.component';
import { BudgetComponent } from './components/budget/budget.component';
import { SubheaderComponent } from '../app/components/subheader/subheader.component';
import { AddBankAccountComponent } from './components/addbankaccount/addbankaccount.component';
import { SecurityComponent } from './components/security/security.component';
import {PartnersComponent} from './components/partners/partners.component';
import { TransactionComponent } from '../app/components/transaction/transaction.component';
import { ToastrService } from 'ngx-toastr';
import {UserService} from './components/service/user.service';
import {CommonService} from '../app/components/service/common.service';
import {LoginService} from '../app/components/service/login.service';
import {TermsComponent} from '../app/components/terms/terms.component';
import {JointeamComponent} from '../app/components/jointeam/jointeam.component';
import {ResetComponent} from '../app/components/reset/reset.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    LoginComponent,
    SignuppageComponent,
    ContactComponent,
    FooterComponent,
    HowitworksComponent,
    BlogComponent,
    AboutusComponent,
    DashboardComponent,
    PrivacyComponent,
    FaqComponent,
    PiechartComponent,
    BudgetComponent,
    SubheaderComponent,
    AddBankAccountComponent,
    TransactionComponent,
    BudgetComponent,
    PressComponent,
    TermsComponent,
    PartnersComponent,
    JointeamComponent,    
    PartnersComponent,
    SecurityComponent,
    ResetComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ChartsModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatAutocompleteModule,
    
  ],
  providers: [UserService,LoginService, DashboardComponent, CommonService],
  bootstrap: [AppComponent],
})
export class AppModule { }
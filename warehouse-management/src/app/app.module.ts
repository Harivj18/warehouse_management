import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { AddSuppliersComponent } from './add-suppliers/add-suppliers.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { ContactusComponent } from './contactus/contactus.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { SignupComponent } from './signup/signup.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ViewDashboardComponent } from './view-dashboard/view-dashboard.component';
import { ViewsuppliersComponent } from './viewsuppliers/viewsuppliers.component';
import { ViewcompanyComponent } from './viewcompany/viewcompany.component';
import { ViewproductsComponent } from './viewproducts/viewproducts.component';
import { MyProfileComponent } from './my-profile/my-profile.component'; 
import { ToastrModule } from 'ngx-toastr';
import { CategoryComponent } from './category/category.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    AddUserComponent,
    AddCompanyComponent,
    AddSuppliersComponent,
    AddProductsComponent,
    ContactusComponent,
    DashboardComponent,
    LoginComponent,
    AboutusComponent,
    SignupComponent,
    ViewDashboardComponent,
    ViewsuppliersComponent,
    ViewcompanyComponent,
    ViewproductsComponent,
    MyProfileComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 5000, 
      progressBar: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

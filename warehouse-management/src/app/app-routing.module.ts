import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { AddSuppliersComponent } from './add-suppliers/add-suppliers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { AuthGuard } from './auth.guard';
import { ViewDashboardComponent } from './view-dashboard/view-dashboard.component';
import { ViewsuppliersComponent } from './viewsuppliers/viewsuppliers.component';
import { ViewcompanyComponent } from './viewcompany/viewcompany.component';
import { ViewproductsComponent } from './viewproducts/viewproducts.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { CategoryComponent } from './category/category.component';
const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'signup',component:SignupComponent},
  {path:'menus',canActivate:[AuthGuard],component:MainNavComponent,
  children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {path:'about',component:AboutusComponent},
    {path:'contact',component:ContactusComponent},
    {path:'adduser',component:AddUserComponent},
    {path:'addcompany',component:AddCompanyComponent},
    {path:'addproducts',component:AddProductsComponent},
    {path:'suppliers',component:AddSuppliersComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'viewadmin',component:ViewDashboardComponent},
    {path:'viewsuppliers',component:ViewsuppliersComponent},
    {path:'viewcompany',component:ViewcompanyComponent},
    {path:'viewproducts',component:ViewproductsComponent},
    {path:'myprofile',component:MyProfileComponent},
    {path:'category',component:CategoryComponent}
  ]
},
{path:'login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

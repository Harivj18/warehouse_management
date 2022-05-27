import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AddUserComponent } from './add-user/add-user.component';
// import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { AddSuppliersComponent } from './add-suppliers/add-suppliers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'menus',canActivate:[AuthGuard],component:MainNavComponent,
  children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {path:'about',component:AboutusComponent},
    {path:'contact',component:ContactusComponent},
    {path:'adduser',component:AddUserComponent},
    // {path:'addsupplier',component:AddSupplierComponent},
    {path:'addcompany',component:AddCompanyComponent},
    {path:'addproducts',component:AddProductsComponent},
    {path:'suppliers',component:AddSuppliersComponent},
    {path:'dashboard',component:DashboardComponent}
  ]
},
{path:'login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
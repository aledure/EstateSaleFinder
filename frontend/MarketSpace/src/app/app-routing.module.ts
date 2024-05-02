import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaleDetailComponent } from './components/sale-detail/sale-detail.component';
import { HomeComponent } from './components/home/home.component';
import { CreateSaleComponent } from './components/create-sale/create-sale.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowseSalesComponent } from './components/browse-sales/browse-sales.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  { path: 'sale', component: SaleDetailComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'create', component: CreateSaleComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'sales', component: BrowseSalesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

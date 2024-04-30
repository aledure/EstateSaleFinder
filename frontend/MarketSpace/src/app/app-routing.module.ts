import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaleDetailComponent } from './components/sale-detail/sale-detail.component';
import { HomeComponent } from './components/home/home.component';
import { CreateSaleComponent } from './components/create-sale/create-sale.component';

const routes: Routes = [
  { path: 'sale', component: SaleDetailComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'create', component: CreateSaleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

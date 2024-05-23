import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SaleDetailComponent } from './components/sale-detail/sale-detail.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { ItemImageModalComponent } from './components/item-image-modal/item-image-modal.component';
import { HomeComponent } from './components/home/home.component';
import { CreateSaleComponent } from './components/create-sale/create-sale.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowseSalesComponent } from './components/browse-sales/browse-sales.component';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AddItemFormComponent } from './components/add-item-form/add-item-form.component';

import { EditSaleComponent } from './components/edit-sale/edit-sale.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ProfileComponent } from './components/profile/profile.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SaleDetailComponent,
    ItemImageModalComponent,
    HomeComponent,
    CreateSaleComponent,
    LoginComponent,
    RegisterComponent,
    BrowseSalesComponent,
    VerifyEmailComponent,
    AddItemFormComponent,
    ProfileComponent,
    EditSaleComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    HttpClientModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatSidenavModule,
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

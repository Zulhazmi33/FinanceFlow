import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../firebase/environment'; // Import environment config

import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './component/home/home.component';
import { IncomeComponent } from './component/income/income.component';
import { ExpenseComponent } from './component/expense/expense.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ReviewComponent } from './component/review/review.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { BalanceComponent } from './component/balance/balance.component';

import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat'; // Import AngularFireModule
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; // Import AngularFireAuthModule
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
<<<<<<< HEAD
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {MatSliderModule} from '@angular/material/slider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
=======
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
>>>>>>> 512fc2b (Final submission before IV)

import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BudgetAllocationComponent } from './component/budget-allocation/budget-allocation.component';
import { CategoryComponent } from './component/category/category.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    IncomeComponent,
    ExpenseComponent,
    LoginComponent,
    RegisterComponent,
    ReviewComponent,
    ProfileComponent,
    ForgotPasswordComponent,
    BalanceComponent,
    BudgetAllocationComponent,
    CategoryComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase), // Initialize Firebase
    AngularFireAuthModule, // Import AngularFireAuthModule
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    FormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDivider,
    MatDatepickerModule,
    MatSelectModule,
    MatTableModule,
    MatMenuModule,
    MatCardModule,
    MatSliderModule,
    MatGridListModule,
    MatListModule,
    MatExpansionModule,

    NgbRatingModule,
<<<<<<< HEAD
    NgbCarouselModule
=======
    NgbCarouselModule,
>>>>>>> 512fc2b (Final submission before IV)
  ],
  providers: [
    provideAnimationsAsync(),
    provideNativeDateAdapter()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

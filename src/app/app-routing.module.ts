import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { HeaderComponent } from './component/header/header.component';
import { ExpenseComponent } from './component/expense/expense.component';
import { IncomeComponent } from './component/income/income.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { ReviewComponent } from './component/review/review.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { BalanceComponent } from './component/balance/balance.component';
import { BudgetAllocationComponent } from './component/budget-allocation/budget-allocation.component';
import { CategoryComponent } from './component/category/category.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Default route
  {path: 'home', component: HomeComponent},
  {path: 'header', component: HeaderComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'expense', component: ExpenseComponent},
  {path: 'income', component: IncomeComponent},
  {path: 'review', component: ReviewComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'balance', component: BalanceComponent},
  {path: 'budget', component: BudgetAllocationComponent},
  {path: 'category', component: CategoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


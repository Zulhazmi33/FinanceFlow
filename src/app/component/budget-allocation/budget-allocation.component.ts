import { Component } from '@angular/core';

@Component({
  selector: 'app-budget-allocation',
  templateUrl: './budget-allocation.component.html',
  styleUrl: './budget-allocation.component.scss'
})
export class BudgetAllocationComponent {
  needValue: number = 50; // Default value
  wantValue: number = 50; // Default value
  savingValue: number = 50; // Default value
}

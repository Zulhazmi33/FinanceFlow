import { Component } from '@angular/core';

@Component({
  selector: 'app-budget-allocation',
<<<<<<< HEAD
  templateUrl: './budget-allocation.component.html',
  styleUrl: './budget-allocation.component.scss'
})
export class BudgetAllocationComponent {
  needValue: number = 50; // Default value
  wantValue: number = 50; // Default value
  savingValue: number = 50; // Default value
=======
  templateUrl: './/budget-allocation.component.html',
  styleUrl: './budget-allocation.component.scss'
})
export class BudgetAllocationComponent {
  needValue: number = 0; 
  wantValue: number = 0; 
  savingValue: number = 0; 
  get totalValue(): number {
    return this.needValue + this.wantValue + this.savingValue;
  }
  pieChartLabels: string[] = ['Need', 'Want', 'Saving'];
  pieChartData: number[] = [50, 30, 20]; // Example values
  pieChartColors = [{ backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'] }];
  pieChartOptions = {responsive: true, maintainAspectRatio: false};

  checkRatio() {
    if(this.totalValue > 100)
      alert("The percentage cannot exceed 100")
    else if(this.totalValue != 100)
      alert("The percentage has to be 100")
    else
      alert("great")
  }


>>>>>>> 512fc2b (Final submission before IV)
}

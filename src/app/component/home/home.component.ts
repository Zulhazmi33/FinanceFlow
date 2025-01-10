import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { TransactionService } from '../../crud/transaction.service';
import { Transaction } from '../../interface/transaction';
import { combineLatest } from 'rxjs';
import { CalendarService } from '../../shared/calendar.service';

Chart.register(...registerables);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  incomeList: Transaction[] = [];
  expenseList: Transaction[] = [];
  combinedList: Transaction[] = [];

  displayedColumns: string[] = ['amount', 'reason', 'category', 'date'];
  userId: string | null = null;
  rating = 4.5;

  allMonth: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  totalExpense: { [month: number]: number } = {};  // Store total expense for each month
  totalIncome: { [month: number]: number } = {};  // Store total income for each month
  totalCombined: { [month: number]: number } = {};  // Store total income for each month

  chartInstance: Chart | null = null;
  monthlyData: { [month: number]: number[] } = {};

  currentMonth: number = new Date().getMonth(); // Initially set to the current month
  displayedMonth: number = this.currentMonth; // Month displayed on the chart
  selectedYear: number = new Date().getFullYear(); // Initially set to the current year
  availableYears: number[] = []; // Initialize empty array for available years

  constructor(
    private trans: TransactionService,
        private cal: CalendarService
    ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || '';
    this.availableYears = this.cal.generateAvailableYears(); // Generate the list of available years dynamically
    this.READ_income();
    this.READ_expense();
    this.READ_combined();
  }

  READ_income() {
    this.trans.READ_income().subscribe(
      (res) => {
        this.incomeList = res
          .map((e: any) => {
            const trans = e.payload.doc.data();
            trans.id = e.payload.doc.id;
            return trans;
          })
          .filter((income: Transaction) => income.userId === this.userId);

          // Calculate total income per month
          this.calculateTotal(this.incomeList, this.totalIncome);
      },
      (err) => {
        alert('Error while fetching income data');
      }
    );
  }
  READ_expense() {
    this.trans.READ_expense().subscribe(
      (res) => {
        this.expenseList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })
        .filter((expense: Transaction) => expense.userId === this.userId);

        // Calculate total expense per month
        this.calculateTotal(this.expenseList, this.totalExpense);
      },
      (err) => {
        alert('Error while fetching expense data');
      }
    );
  }
  READ_combined() {
    combineLatest([
      this.trans.READ_income(),
      this.trans.READ_expense(),
    ]).subscribe(
      ([income, expense]) => {
        const combined = [
          ...income.map((e: any) => {
            const trans = e.payload.doc.data();
            trans.id = e.payload.doc.id;
            trans.type = 'Income';
            return trans;
          }),
          ...expense.map((e: any) => {
            const trans = e.payload.doc.data();
            trans.id = e.payload.doc.id;
            trans.type = 'Expense';
            trans.amount = -Math.abs(trans.amount); // Convert amount to negative
            return trans;
          }),
        ];
        this.combinedList = combined.filter((trans: any) => trans.userId === this.userId);
        
        // Calculate total combined per month
        this.calculateTotal(this.combinedList, this.totalCombined);
        // Prepare data for the selected year and month
        this.generateMonthlyData();
        // Render the chart for the selected month and year
        this.renderChart(this.selectedYear, this.displayedMonth);
      },
      (err) => {
        alert('Error while fetching income or expense data');
      }
    );
  }



  calculateTotal(transactionList: Transaction[], total: { [key: number]: number }) {
    // Initialize total object with 0 for each month
    for (let i = 0; i < 12; i++) {
      total[i] = 0;
    }
  
    // Loop through the transaction list and calculate the total per month for the selected year
    transactionList.forEach((transaction: Transaction) => {
      const [day, month, year] = transaction.currentDate.split('/');
      const transactionYear = parseInt(year);
      const transactionMonth = parseInt(month) - 1; // Convert to 0-indexed month
      const transactionAmount = Number(transaction.amount);
  
      // Filter by selected year
      if (transactionYear === this.selectedYear) {
        total[transactionMonth] += transactionAmount; // Add amount to the corresponding month
      }
    });
  }
  // Function to handle year change from dropdown
  onYearChange(event: any) {
    this.selectedYear = event.value; // MatSelectChange object provides the selected value
    // Recalculate the totals based on the new year
    this.calculateTotal(this.incomeList, this.totalIncome);
    this.calculateTotal(this.expenseList, this.totalExpense);
    this.calculateTotal(this.combinedList, this.totalCombined);
  }


  
  renderChart(year: number, month: number) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const x_axis = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
    const y_axis = this.monthlyData[month];

    if (this.chartInstance) {
      this.chartInstance.destroy(); // Destroy previous instance to avoid duplicates
    }

    const ctx = document.getElementById('profitChart') as HTMLCanvasElement;
    this.chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: x_axis,
        datasets: [
          {
            label: `Cumulative Balance for ${new Date(year, month).toLocaleString('default', { month: 'long' })}`,
            data: y_axis, // Cumulative total for each day
            borderColor: '#4CAF50', // Line color
            backgroundColor: '#E2F4C533', // Fill color with transparency
            fill: true, // Enable filling under the line
            tension: 0 // Set tension to 0 for straight lines
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Day of the Month'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Cumulative Amount (RM)'
            }
          }
        }
      }
    });
  }
  generateMonthlyData() {
    for (let month = 0; month < 12; month++) {
      const daysInMonth = new Date(this.selectedYear, month + 1, 0).getDate();
      const x_axis = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
      let cumulativeTotal = 0;

      this.monthlyData[month] = x_axis.map(day => {
        const dailyTotal = this.combinedList
          .filter(combined => {
            const [dayPart, monthPart, yearPart] = combined.currentDate.split('/');
            const combinedDay = parseInt(dayPart);
            const combinedMonth = parseInt(monthPart) - 1; // Convert to 0-indexed
            const combinedYear = parseInt(yearPart);

            return combinedYear === this.selectedYear && combinedMonth === month && combinedDay === parseInt(day);
          })
          .reduce((sum, combined) => sum + Number(combined.amount), 0);

        cumulativeTotal += dailyTotal;
        return cumulativeTotal;
      });
    }
  }
  onMonthChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.displayedMonth = parseInt(target.value, 10);
    this.renderChart(this.selectedYear, this.displayedMonth);
  }
  get displayedMonthName(): string {
    return new Date(this.selectedYear, this.displayedMonth).toLocaleString('default', { month: 'long' });
  }
}

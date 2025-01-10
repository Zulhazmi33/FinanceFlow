import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { AuthService } from '../../shared/auth.service';
import { TransactionService } from '../../crud/transaction.service';
import { Transaction } from '../../interface/transaction';
import { combineLatest } from 'rxjs';
import { CalendarService } from '../../shared/calendar.service';

@Component({
  selector: 'app-balance',
  standalone: false,
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
  providers: [DatePipe] // Provide DatePipe
})

export class BalanceComponent {

  userId: string | null = "null";
  combinedList: Transaction[] = [];
  displayedColumns_1: string[] = ['amount', 'date'];
  displayedColumns_2: string[] = ['amount', 'reason', 'category', 'date'];
  
  monthlyData: { [month: number]: number[] } = {};
  currentMonth: number = new Date().getMonth(); // Initially set to the current month
  displayedMonth: number = this.currentMonth; // Month displayed on the chart
  selectedYear: number = new Date().getFullYear(); // Initially set to the current year
  availableYears: number[] = []; // Initialize empty array for available years
  chartInstance: Chart | null = null;

  constructor(
    private auth: AuthService, 
    private trans: TransactionService, 
    private datePipe: DatePipe,
    private cal: CalendarService
  ) {}

  ngOnInit(): void {
    this.availableYears = this.cal.generateAvailableYears(); // Generate the list of available years dynamically
    this.userId = localStorage.getItem('userId') || '';  
    this.READ_combined();
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
        this.combinedList = combined.filter((trans: any) => trans.userId === this.userId)
        .sort((a: Transaction, b: Transaction) => {
          // Convert the currentDate strings to Date objects
          const dateA = this.cal.parseDate(a.currentDate);
          const dateB = this.cal.parseDate(b.currentDate);
          return dateA.getTime() - dateB.getTime(); // Sort in ascending order
        });

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



  renderChart(year: number, month: number) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const x_axis = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
    const y_axis = this.monthlyData[month];

    if (this.chartInstance) {
      this.chartInstance.destroy(); // Destroy previous instance to avoid duplicates
    }

    const ctx = document.getElementById('profitChart') as HTMLCanvasElement;
    
    // Function to check the screen width and return a shortened label if needed
    const getResponsiveLabel = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 600) {  // For smaller screens like mobile
        return `Cumulative Balance for ${new Date(year, month).toLocaleString('default', { month: 'short' })}`;
      } else {  // For larger screens
        return `Cumulative Balance for ${new Date(year, month).toLocaleString('default', { month: 'long' })}`;
      }
    };

    this.chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: x_axis,
        datasets: [
          {
            label: getResponsiveLabel(), // Responsive label
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
  onYearChange() {
    // Regenerate the data and chart when the year is changed
    this.generateMonthlyData();
    this.renderChart(this.selectedYear, this.displayedMonth);
  }
  get displayedMonthName(): string {
    return new Date(this.selectedYear, this.displayedMonth).toLocaleString('default', { month: 'long' });
  }
}

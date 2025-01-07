import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { AuthService } from '../../shared/auth.service';
import { TransactionService } from '../../shared/transaction.service';
import { Transaction } from '../../interface/transaction';
import { CalendarService } from '../../shared/calendar.service';

@Component({
  selector: 'app-income',
  standalone: false,
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss'],
  providers: [DatePipe] // Provide DatePipe
})

export class IncomeComponent {
  incomeList: Transaction[] = [];
  incomeObj: Transaction = {
    id: '',
    userId: '',
    amount: '',
    reason: '',
    category: '',
    currentDate: '',
  };

  id: string = '';
  amount: string = '';
  reason: string = '';
  category: string = '';
  userId: string | null = "null";

  formattedCurrentDate: string | null = '';
  displayedColumns: string[] = ['amount', 'reason', 'category', 'date', 'action'];
  isEditing: boolean = false;
  availableYears: number[] = []; // Initialize empty array for available years
  
  monthlyData: { [month: number]: number[] } = {};
  currentMonth: number = new Date().getMonth(); // Initially set to the current month
  displayedMonth: number = this.currentMonth; // Month displayed on the chart
  selectedYear: number = new Date().getFullYear(); // Initially set to the current year
  chartInstance: Chart | null = null;

  constructor(
    private auth: AuthService, 
    private data: TransactionService, 
    private datePipe: DatePipe,
    private cal: CalendarService
  ) {}

  ngOnInit(): void {
    this.availableYears = this.cal.generateAvailableYears();
    this.formattedCurrentDate = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
    this.userId = localStorage.getItem('userId') || '';  
    this.READ_income();
  }


  CREATE_income() {
    if (this.amount === '' || this.reason === '' || this.category === '') {
      alert('Fill all input fields');
      return;
    } else {
      this.incomeObj.id = '';
      this.incomeObj.userId = this.userId;
      this.incomeObj.amount = this.amount;
      this.incomeObj.reason = this.reason;
      this.incomeObj.category = this.category;
      this.incomeObj.currentDate = this.formattedCurrentDate || '';

      this.data.CREATE_income(this.incomeObj);
      this.resetForm();
    }
  }
  READ_income() {
    this.data.READ_income().subscribe(
      (res) => {
        this.incomeList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })
        .filter((income: Transaction) => income.userId === this.userId)
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
        alert('Error while fetching income data');
      }
    );
  }
  UPDATE_income() {console.log('Updating income with ID:', this.id);
    if (this.amount === '' || this.reason === '' || this.category === '') {
        alert('Fill all input fields');
        return;
    } else {
        this.incomeObj.id = this.id;
        this.incomeObj.userId = this.userId;
        this.incomeObj.amount = this.amount;
        this.incomeObj.reason = this.reason;
        this.incomeObj.category = this.category;
        this.incomeObj.currentDate = this.formattedCurrentDate || '';
        
        this.data.UPDATE_income(this.incomeObj).then(() => {
            this.resetForm();
        }).catch(err => {
            alert('Error while updating income data');
        });
    }
  }
  DELETE_income(income: Transaction) {
    if (window.confirm('Are you sure you want to delete?')) {
      this.data.DELETE_income(income);
    }
  }
  editIncome(income: Transaction) {
    this.isEditing = true;

    this.id = income.id;
    this.userId = income.userId;
    this.amount = income.amount;
    this.reason = income.reason;
    this.category = income.category;
    this.formattedCurrentDate = income.currentDate;
  }
  resetForm() {
    this.isEditing = false;

    this.id = '';
    this.amount = '';
    this.reason = '';
    this.category = '';
    this.formattedCurrentDate = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
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
            label: `Cumulative Income for ${new Date(year, month).toLocaleString('default', { month: 'long' })}`,
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
        const dailyTotal = this.incomeList
          .filter(income => {
            const [dayPart, monthPart, yearPart] = income.currentDate.split('/');
            const incomeDay = parseInt(dayPart);
            const incomeMonth = parseInt(monthPart) - 1; // Convert to 0-indexed
            const incomeYear = parseInt(yearPart);

            return incomeYear === this.selectedYear && incomeMonth === month && incomeDay === parseInt(day);
          })
          .reduce((sum, income) => sum + Number(income.amount), 0);

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

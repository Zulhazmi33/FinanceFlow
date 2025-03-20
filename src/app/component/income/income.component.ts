import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { AuthService } from '../../shared/auth.service';
import { TransactionService } from '../../crud/transaction.service';
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
<<<<<<< HEAD
    currentDate: '',
=======
    currentDate: new Date,
>>>>>>> 512fc2b (Final submission before IV)
  };

  id: string = '';
  amount: string = '';
  reason: string = '';
  userId: string | null = "null";

  formattedCurrentDate: string | null = '';
  displayedColumns: string[] = ['amount', 'reason', 'date', 'action'];
<<<<<<< HEAD
  isEditing: boolean = false;
  availableYears: number[] = []; // Initialize empty array for available years
  
=======
  monthNames: string[] = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  isEditing: boolean = false;
  
  availableYears: number[] = []; // Initialize empty array for available years
>>>>>>> 512fc2b (Final submission before IV)
  monthlyData: { [month: number]: number[] } = {};
  currentMonth: number = new Date().getMonth(); // Initially set to the current month
  displayedMonth: number = this.currentMonth; // Month displayed on the chart
  selectedYear: number = new Date().getFullYear(); // Initially set to the current year
  chartInstance: Chart | null = null;

  constructor(
    private auth: AuthService, 
<<<<<<< HEAD
    private data: TransactionService, 
=======
    private trans: TransactionService, 
>>>>>>> 512fc2b (Final submission before IV)
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
    if (this.amount === '' || this.reason === '') {
      alert('Fill all input fields');
      return;
    } else {
      this.incomeObj.id = '';
      this.incomeObj.userId = this.userId;
      this.incomeObj.amount = this.amount;
      this.incomeObj.reason = this.reason;
<<<<<<< HEAD
      this.incomeObj.currentDate = this.formattedCurrentDate || '';

      this.data.CREATE_income(this.incomeObj);
=======
      this.incomeObj.currentDate = new Date;

      this.trans.CREATE_income(this.incomeObj);
>>>>>>> 512fc2b (Final submission before IV)
      this.resetForm();
    }
  }
  READ_income() {
<<<<<<< HEAD
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
=======
    this.trans.READ_income().subscribe(
      (res) => {
        this.incomeList = res.map((e: any) => {
          const trans = e.payload.doc.data();
          trans.id = e.payload.doc.id;

          // Convert Firestore timestamp to JavaScript Date
          if (trans.currentDate && trans.currentDate.seconds) {
            trans.currentDate = new Date(trans.currentDate.seconds * 1000);
          }
          return trans;
        });
  
        // Sort by date in ascending order
        this.incomeList.sort((a, b) => a.currentDate.getTime() - b.currentDate.getTime());
  
        // Update the chart based on selected year and month
        this.updateChartData();
>>>>>>> 512fc2b (Final submission before IV)
      },
      (err) => {
        alert('Error while fetching income data');
      }
    );
  }
  UPDATE_income() {console.log('Updating income with ID:', this.id);
    if (this.amount === '' || this.reason === '') {
        alert('Fill all input fields');
        return;
    } else {
<<<<<<< HEAD
=======
      const existingIncome = this.incomeList.find(exp => exp.id === this.id);
      
      if (existingIncome) {
>>>>>>> 512fc2b (Final submission before IV)
        this.incomeObj.id = this.id;
        this.incomeObj.userId = this.userId;
        this.incomeObj.amount = this.amount;
        this.incomeObj.reason = this.reason;
<<<<<<< HEAD
        this.incomeObj.currentDate = this.formattedCurrentDate || '';
        
        this.data.UPDATE_income(this.incomeObj).then(() => {
=======
        this.incomeObj.currentDate = existingIncome.currentDate;
        
        this.trans.UPDATE_income(this.incomeObj).then(() => {
>>>>>>> 512fc2b (Final submission before IV)
            this.resetForm();
        }).catch(err => {
            alert('Error while updating income data');
        });
<<<<<<< HEAD
=======
      }
>>>>>>> 512fc2b (Final submission before IV)
    }
  }
  DELETE_income(income: Transaction) {
    if (window.confirm('Are you sure you want to delete?')) {
<<<<<<< HEAD
      this.data.DELETE_income(income);
=======
      this.trans.DELETE_income(income);
>>>>>>> 512fc2b (Final submission before IV)
    }
  }
  editIncome(income: Transaction) {
    this.isEditing = true;

    this.id = income.id;
    this.userId = income.userId;
    this.amount = income.amount;
    this.reason = income.reason;
<<<<<<< HEAD
    this.formattedCurrentDate = income.currentDate;
=======
>>>>>>> 512fc2b (Final submission before IV)
  }
  resetForm() {
    this.isEditing = false;

    this.id = '';
    this.amount = '';
    this.reason = '';
    this.formattedCurrentDate = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
  }

<<<<<<< HEAD


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
=======
  renderChart(year: number, month: number) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const x_axis = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());

    // Initialize an array for cumulative amounts
    let y_axis = new Array(daysInMonth).fill(0);

    // Filter incomes for the selected year and month
    const filteredIncomes = this.incomeList
      .filter(income => 
        income.currentDate.getFullYear() === year &&
        income.currentDate.getMonth() === month
      );

    // Store raw daily amounts before accumulation
    let dailyAmounts = new Array(daysInMonth).fill(0);
    
    filteredIncomes.forEach(income => {
        const dayIndex = income.currentDate.getDate() - 1; // Convert day to array index
        if (dayIndex >= 0 && dayIndex < daysInMonth) {
            dailyAmounts[dayIndex] += income.amount; // Add income to the correct day
        }
    });

    // Convert daily amounts to cumulative sum
    y_axis[0] = dailyAmounts[0]; // First day remains the same
    for (let i = 1; i < daysInMonth; i++) {
        y_axis[i] = y_axis[i - 1] + dailyAmounts[i]; // Accumulate the total
    }

    // Destroy previous chart instance to prevent duplicates
    if (this.chartInstance) {
        this.chartInstance.destroy();
    }

    const ctx = document.getElementById('profitChart') as HTMLCanvasElement;

    this.chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: x_axis,
            datasets: [
                {
                    label: `Cumulative Income for ${this.getMonthName(month)}`,
                    data: y_axis,
                    borderColor: '#4CAF50', // Line color
                    backgroundColor: '#E2F4C533', // Fill color with transparency
                    fill: true, // Enable filling under the line
                    tension: 0, // Sharp line
                    // stepped: true // 🔴 Make it a step-like graph (spikes instead of curves)
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
                    },
                    beginAtZero: true
                }
            }
        }
    });
  }

  // Function to get month name from index
  getMonthName(month: number): string {
      return this.monthNames[month] || "";
  }

  
  updateChartData() {
    const filteredIncomes = this.incomeList.filter(income => {
      const incomeDate = income.currentDate;
      return (
        incomeDate.getFullYear() === this.selectedYear &&
        incomeDate.getMonth() === this.displayedMonth
      );
    });
  
    // Sort filtered incomes by date
    filteredIncomes.sort((a, b) => a.currentDate.getTime() - b.currentDate.getTime());
  
    // Initialize an array to hold cumulative income per day
    const daysInMonth = new Date(this.selectedYear, this.displayedMonth + 1, 0).getDate();
    const dailyIncomes = new Array(daysInMonth).fill(0);
  
    // Accumulate incomes per day
    filteredIncomes.forEach(income => {
      const day = income.currentDate.getDate() - 1; // Days are 1-based, array index is 0-based
      dailyIncomes[day] += parseFloat(income.amount);
    });
  
    // Update monthlyData for the selected month
    this.monthlyData[this.displayedMonth] = dailyIncomes;
  
    // Render the updated chart
    this.renderChart(this.selectedYear, this.displayedMonth);
  }
  onMonthChange(value: number) {
    this.displayedMonth = value; // Update in real-time
    this.renderChart(this.selectedYear, this.displayedMonth); // Refresh chart instantly
  }
  
>>>>>>> 512fc2b (Final submission before IV)
}

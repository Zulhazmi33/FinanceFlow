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
<<<<<<< HEAD
  rating = 4.5;
=======
  rating_1 = 4.5;
  rating_2 = 2;
  rating_3 = 3;
>>>>>>> 512fc2b (Final submission before IV)

  allMonth: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  totalExpense: { [month: number]: number } = {};  // Store total expense for each month
  totalIncome: { [month: number]: number } = {};  // Store total income for each month
<<<<<<< HEAD
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
=======
  totalCombined: { [month: number]: number } = {};  // Store net balance for each month

  currentMonth: number = new Date().getMonth(); 
  displayedMonth: number = this.currentMonth; 
  selectedYear: number = new Date().getFullYear(); 
  availableYears: number[] = []; 
  chartInstance: Chart | null = null;

  constructor(
    private trans: TransactionService,
    private cal: CalendarService
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || '';
    this.availableYears = this.cal.generateAvailableYears();
>>>>>>> 512fc2b (Final submission before IV)
    this.READ_income();
    this.READ_expense();
    this.READ_combined();
  }

<<<<<<< HEAD
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
=======
  // Helper function to initialize total amounts for all months
  initializeTotals() {
    for (let i = 0; i < 12; i++) {
      this.totalIncome[i] = 0;
      this.totalExpense[i] = 0;
      this.totalCombined[i] = 0;
    }
  }

  READ_income() {
    this.trans.READ_income().subscribe(
      (res) => {
        this.incomeList = res.map((e: any) => {
          const trans = e.payload.doc.data();
          trans.id = e.payload.doc.id;

          if (trans.currentDate && trans.currentDate.seconds) {
            trans.currentDate = new Date(trans.currentDate.seconds * 1000);
          }
          return trans;
        });

        this.incomeList.sort((a, b) => a.currentDate.getTime() - b.currentDate.getTime());
        this.calculateTotals();
>>>>>>> 512fc2b (Final submission before IV)
      },
      (err) => {
        alert('Error while fetching income data');
      }
    );
  }
<<<<<<< HEAD
=======

>>>>>>> 512fc2b (Final submission before IV)
  READ_expense() {
    this.trans.READ_expense().subscribe(
      (res) => {
        this.expenseList = res.map((e: any) => {
<<<<<<< HEAD
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })
        .filter((expense: Transaction) => expense.userId === this.userId);

        // Calculate total expense per month
        this.calculateTotal(this.expenseList, this.totalExpense);
=======
          const trans = e.payload.doc.data();
          trans.id = e.payload.doc.id;

          if (trans.currentDate && trans.currentDate.seconds) {
            trans.currentDate = new Date(trans.currentDate.seconds * 1000);
          }
          return trans;
        });

        this.expenseList.sort((a, b) => a.currentDate.getTime() - b.currentDate.getTime());
        this.calculateTotals();
>>>>>>> 512fc2b (Final submission before IV)
      },
      (err) => {
        alert('Error while fetching expense data');
      }
    );
  }
<<<<<<< HEAD
=======

>>>>>>> 512fc2b (Final submission before IV)
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
<<<<<<< HEAD
=======

            if (trans.currentDate && trans.currentDate.seconds) {
              trans.currentDate = new Date(trans.currentDate.seconds * 1000);
            }
>>>>>>> 512fc2b (Final submission before IV)
            return trans;
          }),
          ...expense.map((e: any) => {
            const trans = e.payload.doc.data();
            trans.id = e.payload.doc.id;
            trans.type = 'Expense';
<<<<<<< HEAD
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
=======
            trans.amount = -Math.abs(trans.amount);

            if (trans.currentDate && trans.currentDate.seconds) {
              trans.currentDate = new Date(trans.currentDate.seconds * 1000);
            }
            return trans;
          }),
        ];

        this.combinedList = combined.sort((a, b) => a.currentDate.getTime() - b.currentDate.getTime());

        let balance = 0;
        this.combinedList = combined.map((trans) => {
          balance += trans.amount;
          return { ...trans, balance };
        });

        this.calculateTotals();

        // Update the chart based on selected year and month
        this.updateChartData();
>>>>>>> 512fc2b (Final submission before IV)
      },
      (err) => {
        alert('Error while fetching income or expense data');
      }
    );
  }
<<<<<<< HEAD



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
=======
  onYearChange(year: number) {
    this.selectedYear = year; // Update selected year
    this.calculateTotals();   // Recalculate totals for new year
  }
  
  calculateTotals() {
    this.initializeTotals(); // Reset totals before calculation
  
    this.incomeList.forEach((transaction) => {
      const transactionMonth = transaction.currentDate.getMonth();
      const transactionYear = transaction.currentDate.getFullYear();
  
      if (transactionYear === this.selectedYear) {  // Use selected year
        this.totalIncome[transactionMonth] += Number(transaction.amount);
      }
    });
  
    this.expenseList.forEach((transaction) => {
      const transactionMonth = transaction.currentDate.getMonth();
      const transactionYear = transaction.currentDate.getFullYear();
  
      if (transactionYear === this.selectedYear) {  // Use selected year
        this.totalExpense[transactionMonth] += Number(transaction.amount);
      }
    });
  
    for (let i = 0; i < 12; i++) {
      this.totalCombined[i] = this.totalIncome[i] - Math.abs(this.totalExpense[i]);
    }
  }
  

  renderChart(year: number, month: number) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const x_axis = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());

    // Initialize an array for cumulative amounts
    let y_axis = new Array(daysInMonth).fill(0);

    // Filter incomes for the selected year and month
    const filteredIncomes = this.combinedList
      .filter(combined => 
        combined.currentDate.getFullYear() === year &&
        combined.currentDate.getMonth() === month
      );

    // Store raw daily amounts before accumulation
    let dailyAmounts = new Array(daysInMonth).fill(0);
    
    filteredIncomes.forEach(combined => {
        const dayIndex = combined.currentDate.getDate() - 1; // Convert day to array index
        if (dayIndex >= 0 && dayIndex < daysInMonth) {
            dailyAmounts[dayIndex] += combined.amount; // Add combined to the correct day
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
                    label: `Cumulative Income for this month`,
                    data: y_axis,
                    borderColor: '#C9A375  ', // Line color
                    backgroundColor: '#E0C4A333', // Fill color with transparency
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
  updateChartData() {
    const filteredIncomes = this.combinedList.filter(combined => {
      const combinedDate = combined.currentDate;
      return (
        combinedDate.getFullYear() === this.selectedYear &&
        combinedDate.getMonth() === this.displayedMonth
      );
    });
  
    // Sort filtered combineds by date
    filteredIncomes.sort((a, b) => a.currentDate.getTime() - b.currentDate.getTime());
  
    // Initialize an array to hold cumulative combined per day
    const daysInMonth = new Date(this.selectedYear, this.displayedMonth + 1, 0).getDate();
    const dailyIncomes = new Array(daysInMonth).fill(0);
  
    // Accumulate combineds per day
    filteredIncomes.forEach(combined => {
      const day = combined.currentDate.getDate() - 1; // Days are 1-based, array index is 0-based
      dailyIncomes[day] += parseFloat(combined.amount);
    });
  
    // Render the updated chart
    this.renderChart(this.selectedYear, this.displayedMonth);
  }
>>>>>>> 512fc2b (Final submission before IV)
}

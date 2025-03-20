import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { AuthService } from '../../shared/auth.service';
import { TransactionService } from '../../crud/transaction.service';
import { Transaction } from '../../interface/transaction';
import { CalendarService } from '../../shared/calendar.service';
import { CategoryService } from '../../crud/category.service';
import { Category } from '../../interface/category';

@Component({
  selector: 'app-expense',
  standalone: false,
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
  providers: [DatePipe] // Provide DatePipe
})

export class ExpenseComponent {
  categoryList: Category[] = [];
  expenseList: Transaction[] = [];
  expenseObj: Transaction = {
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
  category: string = '';
  userId: string | null = "null";

  formattedCurrentDate: string | null = '';
  selectedCategory: string | null = null;  // Variable to store the selected category
  displayedColumns: string[] = ['amount', 'reason', 'category', 'date', 'action'];
<<<<<<< HEAD
=======
  monthNames: string[] = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
>>>>>>> 512fc2b (Final submission before IV)
  isEditing: boolean = false;
  
  monthlyData: { [month: number]: number[] } = {};
  currentMonth: number = new Date().getMonth(); // Initially set to the current month
  displayedMonth: number = this.currentMonth; // Month displayed on the chart
  selectedYear: number = new Date().getFullYear(); // Initially set to the current year
  availableYears: number[] = []; // Initialize empty array for available years
  chartInstance: Chart | null = null;

  constructor(
    private auth: AuthService, 
    private trans: TransactionService, 
    private cat: CategoryService,
    private datePipe: DatePipe,
    private cal: CalendarService
  ) {}

  ngOnInit(): void {
<<<<<<< HEAD
    this.availableYears = this.cal.generateAvailableYears(); 
=======
    this.availableYears = this.cal.generateAvailableYears();
>>>>>>> 512fc2b (Final submission before IV)
    this.formattedCurrentDate = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
    this.userId = localStorage.getItem('userId') || '';  
    this.READ_expense();
    this.READ_category();
<<<<<<< HEAD
=======
    this.updateChartData(); // Ensure the chart initializes correctly
    Chart.register(...registerables);
>>>>>>> 512fc2b (Final submission before IV)
  }
  READ_category() {
    this.cat.READ_category().subscribe(
      (res) => {
        this.categoryList = res.map((e: any) => {
          const trans = e.payload.doc.data();
          trans.id = e.payload.doc.id;
          return trans;
        })
        .filter((category: Category) => category.userId === this.userId,alert)
      },
      (err) => {
        alert('Error while fetching expense data');
      }
    );
  }
  CREATE_expense() {
    if (this.amount === '' || this.reason === '') {
      alert('Fill all input fields');
      return;
    } else {
      this.expenseObj.id = '';
      this.expenseObj.userId = this.userId;
      this.expenseObj.amount = this.amount;
      this.expenseObj.reason = this.reason;
      this.expenseObj.category = this.category;
<<<<<<< HEAD
      this.expenseObj.currentDate = this.formattedCurrentDate || '';
=======
      this.expenseObj.currentDate = new Date;
>>>>>>> 512fc2b (Final submission before IV)

      this.trans.CREATE_expense(this.expenseObj);
      this.resetForm();
    }
  }
  READ_expense() {
    this.trans.READ_expense().subscribe(
      (res) => {
        this.expenseList = res.map((e: any) => {
          const trans = e.payload.doc.data();
          trans.id = e.payload.doc.id;
<<<<<<< HEAD
          return trans;
        })
        .filter((expense: Transaction) => expense.userId === this.userId)
        .sort((a: Transaction, b: Transaction) => {
          // Convert the currentDate strings to Date objects
          const dateA = this.cal.parseDate(a.currentDate);
          const dateB = this.cal.parseDate(b.currentDate);
          return dateA.getTime() - dateB.getTime(); // Sort in ascending order
        });

        // Filter by selected category if a category is chosen
        if (this.selectedCategory && this.selectedCategory !== 'All') {
          this.expenseList = this.expenseList.filter(
            (expense: Transaction) => expense.category === this.selectedCategory
          );
        }

        // Prepare data for the selected year and month
        this.generateMonthlyData();
        // Render the chart for the selected month and year
        this.renderChart(this.selectedYear, this.displayedMonth);
=======
  
          // Convert Firestore timestamp to JavaScript Date
          if (trans.currentDate && trans.currentDate.seconds) {
            trans.currentDate = new Date(trans.currentDate.seconds * 1000);
          }
          return trans;
        });
  
        // Sort by date in ascending order
        this.expenseList.sort((a, b) => a.currentDate.getTime() - b.currentDate.getTime());
  
        // Update the chart based on selected year and month
        this.updateChartData();
>>>>>>> 512fc2b (Final submission before IV)
      },
      (err) => {
        alert('Error while fetching expense data');
      }
    );
  }
<<<<<<< HEAD
  UPDATE_expense() {console.log('Updating expense with ID:', this.id);
=======
  
  
  UPDATE_expense() {
    console.log('Updating expense with ID:', this.id);
    
>>>>>>> 512fc2b (Final submission before IV)
    if (this.amount === '' || this.reason === '') {
        alert('Fill all input fields');
        return;
    } else {
<<<<<<< HEAD
        this.expenseObj.id = this.id;
        this.expenseObj.userId = this.userId;
        this.expenseObj.amount = this.amount;
        this.expenseObj.reason = this.reason;
        this.expenseObj.category = this.category;
        this.expenseObj.currentDate = this.formattedCurrentDate || '';
        
        this.trans.UPDATE_expense(this.expenseObj).then(() => {
            this.resetForm();
        }).catch(err => {
            alert('Error while updating expense data');
        });
    }
}
=======
        const existingExpense = this.expenseList.find(exp => exp.id === this.id);
        
        if (existingExpense) {
            this.expenseObj.id = this.id;
            this.expenseObj.userId = this.userId;
            this.expenseObj.amount = this.amount;
            this.expenseObj.reason = this.reason;
            this.expenseObj.category = this.category;
            this.expenseObj.currentDate = existingExpense.currentDate; // Retain the original date
            
            this.trans.UPDATE_expense(this.expenseObj).then(() => {
                this.resetForm();
            }).catch(err => {
                alert('Error while updating expense data');
            });
        }
    }
  }

>>>>>>> 512fc2b (Final submission before IV)
  DELETE_expense(expense: Transaction) {
    if (window.confirm('Are you sure you want to delete?')) {
      this.trans.DELETE_expense(expense);
    }
  }
  editExpense(expense: Transaction) {
    this.isEditing = true;

    this.id = expense.id;
    this.userId = expense.userId;
    this.amount = expense.amount;
    this.reason = expense.reason;
    this.category = expense.category;
<<<<<<< HEAD
    this.formattedCurrentDate = expense.currentDate;
=======
>>>>>>> 512fc2b (Final submission before IV)
  }
  resetForm() {
    this.isEditing = false;

    this.id = '';
    this.amount = '';
    this.reason = '';
    this.category = '';
<<<<<<< HEAD
    this.formattedCurrentDate = this.datePipe.transform(new Date(), 'MM/dd/yyyy');
=======
>>>>>>> 512fc2b (Final submission before IV)
  }
  onReasonChange(event: any): void {
    const selectedReason = event.value;
    // Find the category object that matches the selected reason
    const selectedCategory = this.categoryList.find(cat => cat.reason === selectedReason);
    // Set the category value based on the selected reason
    if (selectedCategory) {
      this.category = selectedCategory.category; // Set the category name to the input field
    }
  }
<<<<<<< HEAD
  

=======
>>>>>>> 512fc2b (Final submission before IV)

  renderChart(year: number, month: number) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const x_axis = Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString());
<<<<<<< HEAD
    const y_axis = this.monthlyData[month];

    if (this.chartInstance) {
      this.chartInstance.destroy(); // Destroy previous instance to avoid duplicates
    }

    const ctx = document.getElementById('profitChart') as HTMLCanvasElement;
    
    // Function to check the screen width and return a shortened label if needed
    const getResponsiveLabel = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 600) {  // For smaller screens like mobile
        return `Cumulative Expense for ${new Date(year, month).toLocaleString('default', { month: 'short' })}`;
      } else {  // For larger screens
        return `Cumulative Expense for ${new Date(year, month).toLocaleString('default', { month: 'long' })}`;
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
            borderColor: '#F44336', // Line color
            backgroundColor: '#F4C5C599', // Fill color with transparency
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
        const dailyTotal = this.expenseList
          .filter(expense => {
            const [dayPart, monthPart, yearPart] = expense.currentDate.split('/');
            const expenseDay = parseInt(dayPart);
            const expenseMonth = parseInt(monthPart) - 1; // Convert to 0-indexed
            const expenseYear = parseInt(yearPart);

            return expenseYear === this.selectedYear && expenseMonth === month && expenseDay === parseInt(day);
          })
          .reduce((sum, expense) => sum + Number(expense.amount), 0);

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

    // Initialize an array for cumulative amounts
    let y_axis = new Array(daysInMonth).fill(0);

    // Filter expenses for the selected year and month
    const filteredExpenses = this.expenseList
      .filter(expense => 
        expense.currentDate.getFullYear() === year &&
        expense.currentDate.getMonth() === month
      );

    // Store raw daily amounts before accumulation
    let dailyAmounts = new Array(daysInMonth).fill(0);
    
    filteredExpenses.forEach(expense => {
        const dayIndex = expense.currentDate.getDate() - 1; // Convert day to array index
        if (dayIndex >= 0 && dayIndex < daysInMonth) {
            dailyAmounts[dayIndex] += expense.amount; // Add expense to the correct day
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
                    label: `Cumulative Expense for ${this.getMonthName(month)}`,
                    data: y_axis,
                    borderColor: '#F44336', // Line color
                    backgroundColor: '#F4C5C599', // Fill color with transparency
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
    const filteredExpenses = this.expenseList.filter(expense => {
      const expenseDate = expense.currentDate;
      return (
        expenseDate.getFullYear() === this.selectedYear &&
        expenseDate.getMonth() === this.displayedMonth
      );
    });
  
    // Sort filtered expenses by date
    filteredExpenses.sort((a, b) => a.currentDate.getTime() - b.currentDate.getTime());
  
    // Initialize an array to hold cumulative expense per day
    const daysInMonth = new Date(this.selectedYear, this.displayedMonth + 1, 0).getDate();
    const dailyExpenses = new Array(daysInMonth).fill(0);
  
    // Accumulate expenses per day
    filteredExpenses.forEach(expense => {
      const day = expense.currentDate.getDate() - 1; // Days are 1-based, array index is 0-based
      dailyExpenses[day] += parseFloat(expense.amount);
    });
  
    // Update monthlyData for the selected month
    this.monthlyData[this.displayedMonth] = dailyExpenses;
  
    // Render the updated chart
    this.renderChart(this.selectedYear, this.displayedMonth);
  }
  onMonthChange(value: number) {
    this.displayedMonth = value; // Update in real-time
    this.renderChart(this.selectedYear, this.displayedMonth); // Refresh chart instantly
  }
  
>>>>>>> 512fc2b (Final submission before IV)
}

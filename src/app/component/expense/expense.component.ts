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
    currentDate: '',
  };

  id: string = '';
  amount: string = '';
  reason: string = '';
  category: string = '';
  userId: string | null = "null";

  formattedCurrentDate: string | null = '';
  selectedCategory: string | null = null;  // Variable to store the selected category
  displayedColumns: string[] = ['amount', 'reason', 'category', 'date', 'action'];
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
    this.availableYears = this.cal.generateAvailableYears(); 
    this.formattedCurrentDate = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
    this.userId = localStorage.getItem('userId') || '';  
    this.READ_expense();
    this.READ_category();
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
    alert(this.amount);
    alert(this.reason);
    alert(this.category);
    if (this.amount === '' || this.reason === '') {
      alert('Fill all input fields');
      return;
    } else {
      this.expenseObj.id = '';
      this.expenseObj.userId = this.userId;
      this.expenseObj.amount = this.amount;
      this.expenseObj.reason = this.reason;
      this.expenseObj.category = this.category;
      this.expenseObj.currentDate = this.formattedCurrentDate || '';

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
      },
      (err) => {
        alert('Error while fetching expense data');
      }
    );
  }
  UPDATE_expense() {console.log('Updating expense with ID:', this.id);
    if (this.amount === '' || this.reason === '') {
        alert('Fill all input fields');
        return;
    } else {
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
    this.formattedCurrentDate = expense.currentDate;
  }
  resetForm() {
    this.isEditing = false;

    this.id = '';
    this.amount = '';
    this.reason = '';
    this.category = '';
    this.formattedCurrentDate = this.datePipe.transform(new Date(), 'MM/dd/yyyy');
  }
  onCategoryChange() {
    // Reload the expense list from the database whenever the category changes
    this.READ_expense();  // Fetch all data without filtering
    if (this.selectedCategory && this.selectedCategory !== 'All') {
      // After fetching, filter the expenses based on the selected category
      this.expenseList = this.expenseList.filter(expense => expense.category === this.selectedCategory);
    }
    // Optionally log the selected category
    console.log('Category changed to:', this.selectedCategory);
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
            backgroundColor: '#F4C5C533', // Fill color with transparency
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
}

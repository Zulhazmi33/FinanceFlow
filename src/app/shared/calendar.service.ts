import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
<<<<<<< HEAD

  availableYears: number[] = []; // Initialize empty array for available years

  constructor() { }

  // Helper function to parse date in dd/MM/yyyy format
  parseDate(dateString: string): Date {
    const parts = dateString.split('/');
    // parts[0] = day, parts[1] = month, parts[2] = year
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are 0-based in JavaScript
=======
  availableYears: number[] = []; // List of available years

  constructor() {}

  // Convert dd/MM/yyyy string to Date object
  parseDate(dateString: string): Date {
    const parts = dateString.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are 0-based
>>>>>>> 512fc2b (Final submission before IV)
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }

<<<<<<< HEAD
  // Method to generate available years dynamically
  generateAvailableYears() {
    const pastYears = 10;
    const currentYear = new Date().getFullYear();
    this.availableYears = Array.from(
      { length: pastYears + 1 }, 
      (_, index) => currentYear - pastYears + index
    );
    // Reverse the availableYears array to make 2025 appear at the top
    return this.availableYears.reverse();
  }
  

  
=======
  // Generate available years dynamically
  generateAvailableYears(): number[] {
    const pastYears = 10;
    const currentYear = new Date().getFullYear();
    this.availableYears = Array.from({ length: pastYears + 1 }, (_, index) => currentYear - pastYears + index);
    return this.availableYears.reverse();
  }
>>>>>>> 512fc2b (Final submission before IV)
}

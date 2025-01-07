import { Component } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  
  userId: string | null = null;
  userName: string | null = null;
  showHeader: boolean = true;
  
  constructor(
    private auth: AuthService, 
    private router:Router,
    private activatedRoute: ActivatedRoute  // Inject ActivatedRoute to read route data
  ) { }
  
  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || ''; 
    this.userName = localStorage.getItem('userName') || ''; 

    this.router.events.subscribe(() => {
      this.showHeader = this.router.url !== '/forgot-password'; // Check if the current URL is '/register'
    });
}
  
  isSidebarOpen = false;  // Variable to track sidebar visibility
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  logout() {
    this.auth.logout();
  }
}

import { Component } from '@angular/core';
import { IconService } from '../../shared/icon.service';
import { Category } from '../../interface/category';
import { CategoryService } from '../../crud/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  searchTerm: string = ''; 
  filteredIcons: any[] = []; 

  categoryList: Category[] = [];
  categoryObj: Category = {
    id: '',
    userId: '',
    category: '',
    icon: '',
    reason: '',
  };
  userId: string | null = "null";
  category_selected: string = '';
  resultTerm: string = 'question_mark';
  reason: string = '';

  constructor(private iconService: IconService, private data: CategoryService) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId') || '';  
    this.READ_category();
  }
  // Method to fetch filtered icons based on the search term
  filterIcons() {
    this.filteredIcons = this.iconService.filterIcons(this.searchTerm);
  }
  // Method to handle the selection of an icon
  selectIcon(icon: any) {
    this.searchTerm = '';
    this.resultTerm = icon.name; // Set the selected icon's name into the searchTerm
    this.filteredIcons = []; // Optionally, clear the results after selection
  }
  chooseCategory(category_selected: string) {
    this.category_selected = category_selected;
  }



  CREATE_category() {
    if (this.category_selected === '' || this.resultTerm === '' || this.reason === '') {
      alert('Fill all input fields');
      return;
    } else {
      this.categoryObj.id = '';
      this.categoryObj.userId = this.userId;
      this.categoryObj.category = this.category_selected;
      this.categoryObj.icon = this.resultTerm;
      this.categoryObj.reason = this.reason;

      this.data.CREATE_category(this.categoryObj);
      
      // reset
      this.category_selected = '';
      this.searchTerm = '';
      this.reason = '';
    }
  }
  READ_category() {
    this.data.READ_category().subscribe(
      (res) => {
        this.categoryList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        })
        .filter((category: Category) => category.userId === this.userId,alert)
      },
      (err) => {
        alert('Error while fetching expense data');
      }
    );
  }

}

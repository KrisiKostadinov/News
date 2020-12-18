import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { DeleteCategoryComponent } from '../delete-category/delete-category.component';
import { EditCategoryComponent } from '../edit-category/edit-category.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {

  categories: Category[];

  @Output() selectedCategory: EventEmitter<string> = new EventEmitter<string>();

  constructor(private categoryService: CategoryService,
    private dialog: MatDialog,
    public user: AuthService) { }

  ngOnInit(): void {
    this.categoryService.all()
      .subscribe(data => {
        this.categories = data;
      });
  }

  addCategory() {
    this.dialog.open(AddCategoryComponent)
      .afterClosed()
      .subscribe(data => {
        this.categories.push(data.category);
      });
  }

  selectCategory(id) {
    this.selectedCategory.emit(id);
  }

  delete(title, id) {
    this.dialog.open(DeleteCategoryComponent, {
      data: { title }
    }).afterClosed()
      .subscribe(data => {
        if (data) {
          this.categories = this.categories.filter(c => c._id != id);
          this.categoryService.delete(id)
            .subscribe();
        }
      });
  }

  edit(title, id, i) {
    this.dialog.open(EditCategoryComponent, {
      data: { title }
    }).afterClosed()
      .subscribe(data => {
        if (data) {
          this.categories[i].title = data.title;
          this.categoryService.edit(id, { title: data.title })
            .subscribe();
        }
      });
  }

}

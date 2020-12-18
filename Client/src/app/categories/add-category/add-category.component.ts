import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<Category>,
    @Inject(MAT_DIALOG_DATA) public data: Category) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required]
    });
  }

  add() {
    this.categoryService.add({ ...this.form.value })
      .subscribe(data => {
        this.dialogRef.close(data);
      });
  }

}

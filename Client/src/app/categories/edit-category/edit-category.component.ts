import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<Category>,
    @Inject(MAT_DIALOG_DATA) public data: Category) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.data.title, Validators.required]
    });
  }

  edit() {
    this.dialogRef.close({ ...this.form.value });
  }

}

import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Comment } from 'src/app/models/comment.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<Comment>,
    @Inject(MAT_DIALOG_DATA) public data: Comment) { }

  ngOnInit(): void {
    console.log(this.data);
    this.form = this.fb.group({
      content: [this.data.content, Validators.required]
    });
  }

  edit() {
    this.dialogRef.close({ ...this.form.value, _id: this.data._id });
  }

}

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { AuthService } from 'src/app/services/auth.service';
import { Comment } from 'src/app/models/comment.model';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  form: FormGroup;

  @Output() addComment: EventEmitter<Comment> = new EventEmitter<Comment>();
  @Input() postId: string;

  constructor(private fb: FormBuilder,
    private commentService: CommentService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      content: ['', Validators.required]
    });
  }

  add() {
    if (this.form.valid) {
      this.form.disable();
      this.commentService.add({
        ...this.form.value,
        author: this.authService.data._id,
        post: this.postId
      }).subscribe(data => {
        this.addComment.emit(data);
        this.form.reset();
        this.form.enable();
        this.form.get('content').markAsPending();
      });
    }
  }

}

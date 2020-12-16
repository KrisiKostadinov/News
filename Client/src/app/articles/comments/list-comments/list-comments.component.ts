import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from 'src/app/models/comment.model';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { MatDialog } from '@angular/material/dialog';
import { EditCommentComponent } from '../edit-comment/edit-comment.component';
import { DeleteCommentComponent } from '../delete-comment/delete-comment.component';

@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.component.html',
  styleUrls: ['./list-comments.component.css']
})
export class ListCommentsComponent implements OnInit {

  @Input() comments: Comment[];
  @Output() deletedComment: EventEmitter<Comment> = new EventEmitter<Comment>();
  
  constructor(private authService: AuthService,
    private commentService: CommentService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.updateComments();
  }

  updateComments() {
    this.comments.forEach(comment => {
      comment.isAuthor = comment.author._id == this.authService.data._id;
    });
  }

  edit(index) {
    this.dialog.open(EditCommentComponent, {
      data: this.comments[index],
      height: '200px',
      width: '70%'
    })
      .afterClosed()
      .subscribe(data => {
        if (data) {
          this.comments[index].content = data.content;
          this.commentService.edit({ content: data.content }, data._id)
            .subscribe();
        }
      });
  }

  delete(id, index) {
    this.dialog.open(DeleteCommentComponent, {
      data: { content: this.comments[index].content }
    })
      .afterClosed()
      .subscribe(data => {
        if (data) {
          this.deletedComment.emit(this.comments[index]);
          this.comments = this.comments.filter(c => c._id != id);
          this.commentService.delete(id)
            .subscribe(data => {
            });
        }
      });

  }

}

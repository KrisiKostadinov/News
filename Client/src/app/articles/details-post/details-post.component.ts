import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DeletePostComponent } from '../delete-post/delete-post.component';
import { AngularFireStorage } from '@angular/fire/storage';
import { Comment } from 'src/app/models/comment.model';

@Component({
  selector: 'app-details-post',
  templateUrl: './details-post.component.html',
  styleUrls: ['./details-post.component.css']
})
export class DetailsPostComponent implements OnInit {

  id: string;
  post;

  constructor(private postService: PostService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private storage: AngularFireStorage,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;

    this.postService.byId(this.id)
      .subscribe(data => {
        data.isAuthor = this.authService.data._id == data.author._id;
        this.post = data;

        this.sortComments();

        this.checkAuthorComment();
      });

  }

  edit(id) {
    this.router.navigate(['/post/edit/' + id]);
  }

  delete(id) {
    this.dialog.open(DeletePostComponent, {
      autoFocus: true,
      position: {
        top: '100px'
      },
    }).afterClosed()
      .subscribe(data => {
        if (data) {
          this.postService.delete(id)
            .subscribe(data => {
              this.storage.refFromURL(this.post.imageUrl)
                .delete()
                .subscribe(data => {
                  this.router.navigate(['/post']);
                });
            });
        }
      });
  }

  like() {
    if (!this.post.likes.some(x => x == this.authService.data._id)) {
      this.post.likes.push(this.authService.data._id);
      this.postService.like(this.id, this.authService.data._id)
        .subscribe();
    } else {
      this.post.likes = this.post.likes.filter(x => x != this.authService.data._id);
      this.postService.dislike(this.id, this.authService.data._id)
        .subscribe();
    }
  }

  addedComment() {
    this.getPost();
  }

  deletedComment(comment: Comment) {
    this.post.comments = this.post.comments.filter(c => c._id != comment._id);
  }

  getPost() {
    this.postService.byId(this.id)
      .subscribe(data => {
        data.isAuthor = this.authService.data._id == data.author._id;
        this.post = data;

        this.sortComments();

        this.checkAuthorComment();
      });
  }

  checkAuthorComment() {
    this.post.comments.forEach(comment => {
      comment.isAuthor = comment.author._id == this.authService.data._id;
    });
  }

  deleteAllComments() {
    this.post.comments = [];
    this.postService.deleteAllComments(this.post._id)
      .subscribe(data => {
        this.getPost();
      });
  }

  sortComments() {
    this.post.comments.sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime());
  }

}

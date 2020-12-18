import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DeletePostComponent } from '../delete-post/delete-post.component';
import { AngularFireStorage } from '@angular/fire/storage';
import { Comment } from 'src/app/models/comment.model';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-details-post',
  templateUrl: './details-post.component.html',
  styleUrls: ['./details-post.component.css']
})
export class DetailsPostComponent implements OnInit {

  id: string;
  post: Post = null;

  constructor(private postService: PostService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private storage: AngularFireStorage,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;

    this.getPost();
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
              if (this.post.imageUrl) {
                this.storage.refFromURL(this.post.imageUrl)
                  .delete()
                  .subscribe(data => {
                    this.router.navigate(['/post']);
                  });
              } else {
                this.router.navigate(['/post']);
              }
            });
        }
      });
  }

  like() {
    if (!this.isLikedUser()) {
      this.post.likes.push(this.authService.data._id);
      this.post.isLiked = this.isLikedUser();
      this.postService.like(this.id, this.authService.data._id)
        .subscribe();
    } else {
      this.post.likes = this.post.likes.filter(x => x != this.authService.data._id);
      this.post.isLiked = this.isLikedUser();
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

        if (!this.post.lockComments) {
          this.sortComments();

          this.post.createdOnAsString = new Date(this.post.createdOn).toDateString() + ' / ' + new Date(this.post.createdOn).toLocaleTimeString();
          this.post.isLiked = this.isLikedUser();

          this.checkAuthorComment();
        }
      });
  }

  isLikedUser() {
    return this.post.likes.some(u => u == this.authService.data._id);
  }

  checkAuthorComment() {
    this.post.comments.forEach(comment => {
      comment.isAuthor = comment.author._id == this.authService.data._id;
    });
  }

  public deleteAllComments(): void {
    this.post.comments = [];
    this.postService.deleteAllComments(this.post._id)
      .subscribe(data => {
        this.getPost();
      });
  }

  private sortComments(): void {
    this.post.comments.sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime());
    this.post.comments.forEach(comment => {
      comment.createdOn = new Date(comment.createdOn).toDateString();
    });
  }

  public lockComments(): void {
    if (!this.post.lockComments) {
      this.postService.lockComments(this.id)
      .subscribe(data => {
        this.getPost();
      });
    } else {
      this.postService.unlockComments(this.id)
      .subscribe(data => {
        this.getPost();
      });
    }
  }

}

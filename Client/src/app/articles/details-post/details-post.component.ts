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

        this.post.comments.sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime());
        console.log();

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
    this.postService.like(this.id, this.authService.data._id)
      .subscribe(data => {
        this.post.likes.push(this.authService.data._id);
      });
  }

  addedComment() {
    this.getPost();
  }

  deletedComment(comment: Comment) {
    console.log(this.post.comments, comment);
    this.post.comments = this.post.comments.filter(c => c._id != comment._id);
    console.log(this.post.comments);
  }

  getPost() {
    this.postService.byId(this.id)
      .subscribe(data => {
        data.isAuthor = this.authService.data._id == data.author._id;
        this.post = data;

        this.checkAuthorComment();
      });
  }

  checkAuthorComment() {
    this.post.comments.forEach(comment => {
      comment.isAuthor = comment.author._id == this.authService.data._id;
    });
  }

}

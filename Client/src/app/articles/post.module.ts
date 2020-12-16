import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPostComponent } from './add-post/add-post.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { PostService } from '../services/post.service';
import { ListPostComponent } from './list-post/list-post.component';
import { MatCardModule } from '@angular/material/card';
import { DetailsPostComponent } from './details-post/details-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DeletePostComponent } from './delete-post/delete-post.component';
import { AddCommentComponent } from './comments/add-comment/add-comment.component';
import { ListCommentsComponent } from './comments/list-comments/list-comments.component';
import { CommentService } from '../services/comment.service';
import { MatListModule } from '@angular/material/list';
import { EditCommentComponent } from './comments/edit-comment/edit-comment.component';
import { DeleteCommentComponent } from './comments/delete-comment/delete-comment.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    AddPostComponent,
    ListPostComponent,
    ListPostComponent,
    DetailsPostComponent,
    EditPostComponent,
    DeletePostComponent,
    AddCommentComponent,
    ListCommentsComponent,
    EditCommentComponent,
    DeleteCommentComponent,
  ],
  exports: [
    ListPostComponent,
  ],
  imports: [
    CommonModule,
    EditorModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
  ],
  providers: [
    PostService,
    CommentService,
  ],
  entryComponents: [
    DeletePostComponent,
    EditCommentComponent,
    DeleteCommentComponent,
  ]
})
export class PostModule { }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  url: string = environment.url;
  addPath: string = '/comment/add';
  editPath: string = 'comment/edit';
  deletePath: string = '/comment/delete';

  constructor(private http: HttpClient) { }

  add(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.url + this.addPath, comment);
  }

  edit(comment: Comment, commentId: string): Observable<Comment> {
    return this.http.post<Comment>(this.url + `/${this.editPath}/${commentId}`, comment);
  }

  delete(commentId: string): Observable<Comment> {
    return this.http.delete<Comment>(this.url + `${this.deletePath}/${commentId}`);
  }

}

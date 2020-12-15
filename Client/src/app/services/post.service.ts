import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  url: string = environment.url;
  allPath: string = '/posts/all';
  addPath: string = '/posts/add';
  byIdPath: string = '/posts/details';
  deletePath: string = '/posts/delete';
  editPath: string = '/posts/edit';
  likePath: string = '/posts/like';

  constructor(private http: HttpClient) { }

  add(data): Observable<Post> {
    return this.http.post<Post>(this.url + this.addPath, data);
  }

  all(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url + this.allPath);
  }

  byId(id): Observable<Post> {
    return this.http.get<Post>(this.url + this.byIdPath + `/${id}`);
  }

  delete(id): Observable<Post> {
    return this.http.delete<Post>(this.url + this.deletePath + `/${id}`);
  }

  edit(data, id): Observable<Post> {
    return this.http.post<Post>(this.url + this.editPath + `/${id}`, data);
  }

  like(id, userId): Observable<Post> {
    return this.http.post<Post>(this.url + this.likePath + `/${id}`, { userId });
  }

}

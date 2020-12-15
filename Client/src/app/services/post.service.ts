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

  constructor(private http: HttpClient) { }

  add(data): Observable<Post> {
    return this.http.post<Post>(this.url + this.addPath, data);
  }

  all(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url + this.allPath);
  }

}

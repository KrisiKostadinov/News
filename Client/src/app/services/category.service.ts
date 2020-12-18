import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url: string = environment.url;
  addPath: string = '/category/add';
  allPath: string = '/category/all';
  deletePath: string = '/category/delete';
  editPath: string = '/category/edit';

  constructor(private http: HttpClient) { }

  all(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + this.allPath);
  }

  add(data: Category): Observable<Category> {
    return this.http.post<Category>(this.url + this.addPath, data);
  }

  delete(id): Observable<Category> {
    return this.http.delete<Category>(this.url + this.deletePath + `/${id}`);
  }

  edit(id, data: Category): Observable<Category> {
    return this.http.post<Category>(this.url + this.editPath + `/${id}`, data);
  }

}

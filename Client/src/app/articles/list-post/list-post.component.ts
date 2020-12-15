import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {

  articles: Post[];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.all()
      .subscribe(data => {
        this.articles = data;
        console.log(this.articles);
      });
  }

}

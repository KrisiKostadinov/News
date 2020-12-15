import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {

  articles: Post[];

  constructor(private postService: PostService,
              private router: Router) { }

  ngOnInit(): void {
    this.postService.all()
      .subscribe(data => {
        data.forEach(post => {
          post.subContent = post.content.substring(0, 200) + '...';
        });

        this.articles = data;
      });
  }

  byId(id) {
    this.router.navigate(['/post/details/' + id]);
  }

}

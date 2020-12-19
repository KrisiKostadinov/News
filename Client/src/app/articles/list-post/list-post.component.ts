import { Component, OnInit, SecurityContext } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/models/post.model';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {

  articles: Post[];
  displayArticles: Post[];
  selectedCategoryId: string;

  constructor(private postService: PostService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPosts();
  }

  isInCategory(id) {
    if (id) {
      this.displayArticles = this.articles.filter(a => a.category._id == id);
    }
  }

  private getPosts() {
    this.postService.all()
      .subscribe(data => {
        data.forEach(post => {
          const clearHTML = post.content.replace(/<[^>]*>/g, '');
          post.subContent = clearHTML.substr(0, 200) + '...';
          post.createdOnAsString = new Date(post.createdOn).toDateString() + ' / ' + new Date(post.createdOn).toLocaleTimeString();
        });

        this.articles = data;
        this.displayArticles = this.articles;
        this.filterArticles(this.selectedCategoryId);
        this.isInCategory(this.route.snapshot.params['id']);
      });
  }

  filterArticles(id) {
    if (id) {
      this.displayArticles = this.articles.filter(a => a.category?._id == id);
    }
  }

  byId(id) {
    this.router.navigate(['/post/details/' + id]);
  }

  selectedCategory(id) {
    if (id == 'all') {
      return this.displayArticles = this.articles;
    }

    this.displayArticles = this.articles.filter(a => a.category._id == id);
  }

}

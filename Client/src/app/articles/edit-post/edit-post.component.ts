import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  form: FormGroup;
  id: string;
  post;

  constructor(private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;

    this.postService.byId(this.id)
      .subscribe(data => {
        this.post = data;

        this.form = this.fb.group({
          title: [data.title, [Validators.required, Validators.minLength(10)]],
          content: [data.content]
        });
      });
  }

  edit() {
    this.postService.edit({
      ...this.form.value,
    }, this.id).subscribe(data => {
      this.router.navigate(['/post']);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
    private postService: PostService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      'title': ['', [Validators.required, Validators.minLength(10)]],
      'content': ['']
    });
  }

  add() {
    if (this.form.valid) {
      this.postService.add(this.form.value)
        .subscribe(data => {
          console.log(data);
        })
    }
  }

}

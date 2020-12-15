import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, finalize } from "rxjs/operators";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  form: FormGroup;

  downloadURL: Observable<string>;

  file: File;

  constructor(private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private authService: AuthService,
    private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      'title': ['', [Validators.required, Validators.minLength(10)]],
      'content': ['']
    });
  }

  add() {
    if (this.form.valid) {

      this.upload().subscribe(data => {
        this.form.disable();
      });
    }
  }

  onFileSelected(event) {
    this.file = event.target.files[0];
  }

  upload() {
    var n = Date.now();
    const filePath = `PostsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`PostsImages/${n}`, this.file);

    return task
    .snapshotChanges()
    .pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(url => {
          
          this.postService.add({
            ...this.form.value,
            author: this.authService.data._id,
            imageUrl: url
          }).subscribe(data => {
            this.router.navigate(['/post']);
          });
        });
      })
    );
  }

}

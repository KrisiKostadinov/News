import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, finalize, startWith } from "rxjs/operators";
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  form: FormGroup;

  downloadURL: Observable<string>;

  file: File;
  imageSrc: string;

  categories: Category[];

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  tags: string[] = ['Angular'];
  allTags: string[] = ['Angular', 'React', 'FrontEnd'];

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private authService: AuthService,
    private storage: AngularFireStorage,
    private categoryService: CategoryService) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allTags.slice()));
  }

  ngOnInit(): void {
    this.categoryService.all()
      .subscribe(data => {
        this.categories = data;
      });

    this.form = this.fb.group({
      'title': ['', [Validators.required, Validators.minLength(10)]],
      'content': ['', Validators.required],
      'category': ['']
    });
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.tagCtrl.setValue(null);
  }

  removeTag(fruit: string): void {
    const index = this.tags.indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  add() {
    if (this.form.valid) {
      this.upload().subscribe(data => {
        this.form.disable();
      });
    }
  }

  onFileSelected(event) {
    const reader = new FileReader();
    this.file = event.target.files[0];
    reader.readAsDataURL(this.file);

    reader.onload = () => {

      this.imageSrc = reader.result as string;
    }
  }
  
  removeSrc() {
    this.imageSrc = null;
    this.file = null;
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

            if (!this.file) {
              url = '';
            }

            this.postService.add({
              ...this.form.value,
              author: this.authService.data._id,
              imageUrl: url,
              tags: this.tags
            }).subscribe(data => {
              this.router.navigate(['/post']);
            });
          });
        })
      );
  }

}

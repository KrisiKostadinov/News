import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      fullname: ['', Validators.required]
    });
  }

  register() {
    if(this.form.valid) {
      this.authService.register({ ...this.form.value })
      .subscribe(data => {
        if(!data.error) {
          this.authService.saveToken(data.token);
          this.authService.saveUser({
            fullname: data.fullname,
            email: data.email
          });
          
          return this.router.navigate(['/']);
        }
      });
    }
  }

}

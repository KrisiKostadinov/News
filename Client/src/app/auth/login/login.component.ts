import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    if(this.form.valid) {
      this.authService.login({ ...this.form.value })
      .subscribe(data => {
        if(!data.error) {
          this.authService.saveToken(data.token);
          this.authService.saveUser({
            fullname: data.fullname,
            email: data.email,
            _id: data._id,
          });
          
          return this.router.navigate(['/']);
        }
      });
    }
  }

}

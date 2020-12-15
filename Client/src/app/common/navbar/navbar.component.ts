import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public user: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.user.logout();
    this.router.navigate(['/user/login']);
  }

}

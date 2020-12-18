import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from '../app-routing.module';
import { AddCategoryComponent } from '../categories/add-category/add-category.component';
import { ListCategoryComponent } from '../categories/list-category/list-category.component';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    NavbarComponent,
  ],
  exports: [
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatListModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  entryComponents: [
    AddCategoryComponent,
  ]
})
export class CommonAppModule { }

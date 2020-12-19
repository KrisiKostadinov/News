import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPostComponent } from './add-post/add-post.component';
import { ListPostComponent } from './list-post/list-post.component';
import { DetailsPostComponent } from './details-post/details-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';


const routes: Routes = [
  { path: 'add', component: AddPostComponent },
  { path: '', component: ListPostComponent },
  { path: 'category/:id', component: ListPostComponent },
  { path: 'details/:id', component: DetailsPostComponent },
  { path: 'edit/:id', component: EditPostComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }

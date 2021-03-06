import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ListPostComponent } from './articles/list-post/list-post.component';


const routes: Routes = [
  {
    path: '', component: ListPostComponent,
  },
  {
    path: 'post',
    loadChildren: () => import('./articles/post-routing.module').then(m => m.PostRoutingModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'user',
    loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

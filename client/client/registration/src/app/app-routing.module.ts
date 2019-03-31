import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: '', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'detail/:id', loadChildren: './detail/detail.module#DetailPageModule' },
  { path: 'addpost', loadChildren: './add-post/add-post.module#AddPostPageModule' },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

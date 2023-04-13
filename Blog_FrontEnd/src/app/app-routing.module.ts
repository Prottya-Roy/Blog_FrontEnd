import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ProfileComponent} from "./profile/profile.component";
import {MessagesComponent} from "./messages/messages.component";
import {AuthGuard} from "./_guards/auth.guard";
import {BlogsComponent} from "./blogs/blogs.component";

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'messages', component: MessagesComponent,canActivate:[AuthGuard]},
  {path:'blogs', component: BlogsComponent},
  {path:'**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

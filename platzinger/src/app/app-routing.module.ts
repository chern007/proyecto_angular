import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  // {path:'', component:HomeComponent},
  // {path:'home', component:HomeComponent},
  // {path:'login', component:LoginComponent},
  // {path:'conversation', component:ConversationComponent},
  // {path:'profile', component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

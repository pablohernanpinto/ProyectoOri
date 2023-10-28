import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PageComponent } from './components/page/page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddComComponent } from './components/modals/add-com/add-com.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },  
  { path: 'page', component: PageComponent },
  { path: 'Add-Com', component: AddComComponent},
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

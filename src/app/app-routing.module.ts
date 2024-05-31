import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PageComponent } from './components/page/page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { loginGuard } from 'src/guards/login.guard'; 
import { FormulariosComponent } from './components/formularios/formularios.component';



const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'page', component: PageComponent/* , canActivate: [loginGuard] */}, // ADMIN + USUARIO PRIVILEGIO 
  { path: 'formulario', component: FormulariosComponent/* , canActivate: [loginGuard] */},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

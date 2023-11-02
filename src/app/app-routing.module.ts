import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PageComponent } from './components/page/page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddComComponent } from './components/modals/add-com/add-com.component';
import { loginGuard } from 'src/guards/login.guard';
import { AddUsuarioComponent } from './components/modals/add-usuario/add-usuario.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'page', component: PageComponent, canActivate: [loginGuard] }, // ADMIN + USUARIO PRIVILEGIO
  { path: 'Add-Com', component: AddComComponent, canActivate: [loginGuard]}, // ADMIN + USUARIO PRIVILEGIO
  { path: 'Add-usuario', component: AddUsuarioComponent,  data: { roles: ['admin'] }}, // ADMIN
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

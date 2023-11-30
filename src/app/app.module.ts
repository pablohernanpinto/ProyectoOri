import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PageComponent } from './components/page/page.component';

import { AppRoutingModule } from './app-routing.module';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AllConveniosComponent } from './components/all-convenios/all-convenios.component';
import { AddComComponent } from './components/modals/add-com/add-com.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from './components/modals/modalInfo/modal.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgToastModule } from 'ng-angular-popup';
import { AddInstitucionComponent } from './components/modals/add-institucion/add-institucion.component';
import { AddCoordinadorComponent } from './components/modals/add-coordinador/add-coordinador.component';
import { AddUsuarioComponent } from './components/modals/add-usuario/add-usuario.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { UsersComponent } from './components/users/users.component';
import { AddUnidadGestoraComponent } from './components/modals/add-unidad-gestora/add-unidad-gestora.component';
import { ModificarConvenioComponent } from './components/modals/modificar-convenio/modificar-convenio.component';
import { FormulariosComponent } from './components/formularios/formularios.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageComponent,

    AddComComponent,
    PageNotFoundComponent,
    AllConveniosComponent,
    HeaderComponent,
    ModalComponent,
    AddInstitucionComponent,
    AddCoordinadorComponent,
    AddUsuarioComponent,
    UsersComponent,
    AddUnidadGestoraComponent,
    ModificarConvenioComponent,
    FormulariosComponent,


  ],
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgSelectModule,
    NgToastModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

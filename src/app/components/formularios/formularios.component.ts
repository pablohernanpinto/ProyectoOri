import { Component, Inject, Renderer2, ViewChild } from '@angular/core';
import { AddCoordinadorComponent } from '../modals/add-coordinador/add-coordinador.component';
import { AddInstitucionComponent } from '../modals/add-institucion/add-institucion.component';
import { AddUsuarioComponent } from '../modals/add-usuario/add-usuario.component';
import { AddUnidadGestoraComponent } from '../modals/add-unidad-gestora/add-unidad-gestora.component';
import { AddComComponent } from '../modals/add-com/add-com.component';
import { MatSidenav } from '@angular/material/sidenav';
import { HttpClient } from '@angular/common/http';
import { ModalService } from '../header/modal.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/guards/login.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.component.html',
  styleUrls: ['./formularios.component.css']

})
export class FormulariosComponent {
  unidadGestora: any;


  coordinadores: any;
  url = 'http://localhost:3000/api/';
    constructor(
      private router: Router, 
      private renderer: Renderer2, 
      @Inject(DOCUMENT) 
      private document: Document,
      public loginService: LoginService,
      public dialog: MatDialog,
      private http: HttpClient,
      private envioServicio: ModalService
  
      ) { }
    sidebarOpen = false;
    @ViewChild('sidenav') sidenav: MatSidenav | undefined;
    convenios: any;
    busqueda:string  = '';
    institucionBool: boolean = false;
    unidadGestoraBool: boolean = false;
    alcanceBool: boolean = false;
    paisBool: boolean = false;
    movilidadBool: boolean = false;
    tipoDeConvenioBool: boolean = false;
    tipoDeFirmaBool: boolean = false;
    anioDeFirmaBool: boolean = false;
    estatusBool: boolean = false;
    fechaDeTerminoBool: boolean = false;
    instituciones: any[] = [];
    NombreInstitucion: any[]= [];

    formulario = {
      id_unidad_gestora: '',
      id_coordinador: '',
      nombre_conv: '',
      tipo_conv: '',
      movilidad:'',
      vigencia: '',
      ano_firma: '',
      tipo_firma: '',
      cupos: '',
      documentos: '',
      condicion_renovacion:'',
      id_institucion: '',
      estatus:'Activo',
      fecha_inicio: '',
      fecha_termino: '',
  
      fecha_InicioSinFormato:'',
      fecha_FinalSinFormato:'',
      nombre_unidadGestora: '',
      nombre_coordinador: '',
      nombre_institucion: '',
    }; 

  

  PRUEBA(){
    console.log(this.loginService.getUserRole())
  }
  toggleSidenav() {
    // Verifica que sidenav no sea undefined antes de usarlo
    if (this.sidenav) {
      this.sidenav.toggle();
    }
  }
   logout() {
    this.loginService.logout(); // Llama al método logout del servicio
  } 

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  Home(){
    this.router.navigateByUrl('/page');
    
  }
  imprimir(){
    console.log(this.instituciones)
  }

  ngOnInit(){
   
    this.PedirInstitucion();
  }

  enviarMensaje(){
    this.envioServicio.disparadorDeBusqueda.next({mensaje:this.busqueda})
  }


  hacerPeticion() {
    const url = 'http://localhost:3000/api/convenios';
    this.http.get(url).subscribe((data: any) => {
      this.convenios = data;
    });
  }
  ModalAddInstituciones(){
    const dialogRef = this.dialog.open(AddInstitucionComponent);
  }

  ModalAddCoordinador(){
    const dialogRef = this.dialog.open(AddCoordinadorComponent);
  }

  ModalAddUsuario(){
    const dialogRef = this.dialog.open(AddUsuarioComponent);
  }
  ModalAddUnidadGestora(){
    const dialogRef = this.dialog.open(AddUnidadGestoraComponent);
  }
  ModalADD() {
    const dialogRef = this.dialog.open(AddComComponent);
  }

  

  PedirInstitucion() {
    this.http.get(this.url+'unidad_gestora/').subscribe((data: any) => {
      this.unidadGestora = data;
    });

    this.http.get(this.url+'instituciones/').subscribe((data: any) => {
      this.instituciones = data;
      for (let i = 0; i < this.instituciones.length; i++) {
        this.NombreInstitucion.push(this.instituciones[i].Nombre_Institucion)
        this.instituciones.push(this.instituciones[i].id)
        }
      });

    this.http.get(this.url+'coordinadores/').subscribe((data: any) => {
      this.coordinadores = data;
    });
  }

}

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
import { ModalGenerarReportesComponent } from '../modals/modal-generar-reportes/modal-generar-reportes.component';
import { ModificaUsuarioComponent } from '../modals/modifica-usuario/modifica-usuario.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.component.html',
  styleUrls: ['./formularios.component.css']

})
export class FormulariosComponent {
  unidadGestora: any;


  coordinadores: any;
  url = 'http://localhost:3000/api/';
  data: any;
    constructor(
      private router: Router, 
      private renderer: Renderer2, 
      @Inject(DOCUMENT) 
      private document: Document,
      public loginService: LoginService,
      public dialog: MatDialog,
      private http: HttpClient,
      private envioServicio: ModalService,
      private formBuilder: FormBuilder
  
      ) { }
    sidebarOpen = false;
    @ViewChild('sidenav') sidenav: MatSidenav | undefined;
    convenios: any;
    busqueda:string  = '';
    institucionBool: boolean = true;
    unidadGestoraBool: boolean = true;
    alcanceBool: boolean = true;
    paisBool: boolean = true;
    movilidadBool: boolean = true;
    tipoDeConvenioBool: boolean = true;
    tipoDeFirmaBool: boolean = true;
    anioDeFirmaBool: boolean = true;
    estatusBool: boolean = true;
    fechaDeTerminoBool: boolean = true;


    formularioEntrega = this.formBuilder.group({
      id_unidad_gestora: [{ value: '', disabled:true}],
      nombre_conv: [{ value: '', disabled:true}],
      tipo_conv: [{ value: '', disabled:true}],
      movilidad:[{ value: '', disabled:true}],
      vigencia:[{ value: '', disabled:true}],
      ano_firma:[{ value: '', disabled:true}],
      tipo_firma:[{ value: '', disabled:true}],
      cupos:[{ value: '', disabled:true}],
      documentos:[{ value: '', disabled:true}],
      condicion_renovacion:[{ value: '', disabled:true}],
      id_institucion:[{ value: '', disabled:true}],
      estatus:'Activo',
      fecha_inicio:[{ value: '', disabled:true}],
      fecha_termino:[{ value: '', disabled:true}],
      id_coordinador_externo: [{ value: '', disabled:true}],
      id_coordinador_interno: [{ value: '', disabled:true}],
      alcance:[{ value: '', disabled: true}],
      pais: [{ value: '', disabled: true}],
  
      fecha_InicioSinFormato: new FormControl<Date | null>(null),
      fecha_FinalSinFormato: new FormControl<Date | null>(null),
      nombre_unidadGestora:[{ value: '', disabled:true}],
      nombre_coordinador:[{ value: '', disabled:true}],
      nombre_institucion: [{ value: '', disabled:true}],

      nombre_coordinador_Externo:[{ value: '', disabled:true}],
      nombre_coordinador_Interno:[{ value: '', disabled:true}],
  
    })

    cambioEstado(indice:number){
      if(indice == 1){
        this.institucionBool = !this.institucionBool
        if (this.institucionBool) {
          this.formularioEntrega.get('nombre_institucion')?.disable();
        } else {
          this.formularioEntrega.get('nombre_institucion')?.enable();
        }
      }
      if(indice == 2){
        this.tipoDeConvenioBool = !this.tipoDeConvenioBool
        if (this.tipoDeConvenioBool) {
          this.formularioEntrega.get('tipo_conv')?.disable();
        } else {
          this.formularioEntrega.get('tipo_conv')?.enable();
        }
      }
      if(indice == 3){
        this.unidadGestoraBool = !this.unidadGestoraBool
        if (this.unidadGestoraBool) {
          this.formularioEntrega.get('nombre_unidadGestora')?.disable();
        } else {
          this.formularioEntrega.get('nombre_unidadGestora')?.enable();
        }
      }
      if(indice == 4){
        this.tipoDeFirmaBool = !this.tipoDeFirmaBool
        if (this.tipoDeFirmaBool) {
          this.formularioEntrega.get('tipo_firma')?.disable();
        } else {
          this.formularioEntrega.get('tipo_firma')?.enable();
        }
      }
      if(indice == 5){
        this.alcanceBool = !this.alcanceBool
        if (this.alcanceBool) {
          this.formularioEntrega.get('alcance')?.disable();
        } else {
          this.formularioEntrega.get('alcance')?.enable();
        }
      }
      if(indice == 6){
        this.anioDeFirmaBool = !this.anioDeFirmaBool
        if (this.anioDeFirmaBool) {
          this.formularioEntrega.get('ano_firma')?.disable();
        } else {
          this.formularioEntrega.get('ano_firma')?.enable();
        }
      }
      if(indice == 7){
        this.paisBool = !this.paisBool
        if (this.paisBool) {
          this.formularioEntrega.get('pais')?.disable();
        } else {
          this.formularioEntrega.get('pais')?.enable();
        }
      }
      if(indice == 8){
        this.institucionBool = !this.institucionBool
        if (this.institucionBool) {
          this.formularioEntrega.get('tipo_conv')?.disable();
        } else {
          this.formularioEntrega.get('tipo_conv')?.enable();
        }
      }
      if(indice == 9){
        this.institucionBool = !this.institucionBool
        if (this.institucionBool) {
          this.formularioEntrega.get('tipo_conv')?.disable();
        } else {
          this.formularioEntrega.get('tipo_conv')?.enable();
        }
      }
      if(indice == 10){
        this.institucionBool = !this.institucionBool
        if (this.institucionBool) {
          this.formularioEntrega.get('tipo_conv')?.disable();
        } else {
          this.formularioEntrega.get('tipo_conv')?.enable();
        }
      }
    }

    formulario = {
      Alcance: [] as any[],
      Anio_Firma:  [] as any[],
      Condicion_Renovacion: [] as any[],
      Estatus: [] as any[],
      Movilidad:[] as any[],
      Nombre_Institucion: [] as any[],
      Pais: [] as any[],
      Tipo_Firma: [] as any[],
      Vigencia: [] as any[],
      Nombre_Unidad_Gestora: [] as any[],
      Tipo_Institucion: [] as any[],
      Nombre_Coordinador_Externo: [] as any[],
      Nombre_Coordinador_Interno: [] as any[],
      Tipo_Convenio: [] as any[],
    };
  


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

  }

  ngOnInit(){
   this.hacerPeticion();
  }

  ModalUsuario(){
    const dialogRef = this.dialog.open(ModificaUsuarioComponent);
  }

  enviarMensaje(){
    this.envioServicio.disparadorDeBusqueda.next({mensaje:this.busqueda})
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
  modalReporte(){
    const dialogRef = this.dialog.open(ModalGenerarReportesComponent);
  }
  
  
  hacerPeticion() {
    const url = 'http://localhost:3000/api/convenios';
    this.http.get(url).subscribe((data: any) => {
      this.convenios = data;
//      console.log(data)

      this.data = data
      this.formulario.Alcance = [...new Set(data.map((convenio: { Alcance: any; }) => convenio.Alcance))];
      this.formulario.Anio_Firma = [...new Set(data.map((convenio: { Anio_Firma: any; }) => convenio.Anio_Firma))];
      this.formulario.Condicion_Renovacion = [...new Set(data.map((convenio: { Condicion_Renovacion: any; }) => convenio.Condicion_Renovacion))];
      this.formulario.Estatus = [...new Set(data.map((convenio: { Estatus: any; }) => convenio.Estatus))];
      this.formulario.Movilidad = [...new Set(data.map((convenio: { Movilidad: any; }) => convenio.Movilidad))];
      this.formulario.Nombre_Institucion = [...new Set(data.map((convenio: { Nombre_Institucion: any; }) => convenio.Nombre_Institucion))];
      this.formulario.Pais = [...new Set(data.map((convenio: { Pais: any; }) => convenio.Pais))];
      this.formulario.Tipo_Convenio = [...new Set(data.map((convenio: { Tipo_Convenio: any; }) => convenio.Tipo_Convenio))];
      this.formulario.Tipo_Firma = [...new Set(data.map((convenio: { Tipo_Firma: any; }) => convenio.Tipo_Firma))];
      this.formulario.Vigencia = [...new Set(data.map((convenio: { Vigencia: any; }) => convenio.Vigencia))];
      this.formulario.Nombre_Unidad_Gestora = [...new Set(data.map((convenio: { Nombre_Unidad_Gestora: any; }) => convenio.Nombre_Unidad_Gestora))];
      this.formulario.Nombre_Coordinador_Externo = [...new Set(data.map((convenio: { Nombre_Coordinador_Externo: any; }) => convenio.Nombre_Coordinador_Externo))]; 
      this.formulario.Nombre_Coordinador_Interno = [...new Set(data.map((convenio: { Nombre_Coordinador_Interno: any; }) => convenio.Nombre_Coordinador_Interno))]; 

    });

  }

}

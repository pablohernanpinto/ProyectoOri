import { Component } from '@angular/core';
import { DataSharingService } from '../all-convenios/data-sharing.service';
import { ModalService } from '../header/modal.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'src/guards/login.service';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  
  constructor(
    public loginService: LoginService,
    public dialog: MatDialog,
    private http: HttpClient,
    private envioServicio: ModalService,
  
    ) { }

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
  };
  opciones: any[] | undefined;
  myControl = new FormControl('');
  busqueda:string  = '';

  filteredOptions: Observable<string[]> | undefined;

  enviarMensaje(){
    this.envioServicio.disparadorDeBusqueda.next({mensaje:this.busqueda})
  }


  filtro(filtroNombre: string) {
    this.opciones = []
    if (filtroNombre == 'Alcance'){
      this.opciones = this.formulario.Alcance
    }
    else if (filtroNombre == 'Anio_Firma'){
      this.opciones = this.formulario.Anio_Firma
    }

    else if (filtroNombre == 'Condicion_Renovacion'){
      this.opciones = this.formulario.Condicion_Renovacion
    }

    else if (filtroNombre == 'Estatus'){
      this.opciones = this.formulario.Estatus
    }

    else if (filtroNombre == 'Movilidad'){
      this.opciones = this.formulario.Movilidad
    }

    else if (filtroNombre == 'Nombre_Institucion'){
      this.opciones = this.formulario.Nombre_Institucion
    }

    else if (filtroNombre == 'Pais'){
      this.opciones = this.formulario.Pais
    }

    else if (filtroNombre == 'Tipo_Firma'){
      this.opciones = this.formulario.Tipo_Firma
    }

    else if (filtroNombre == 'Nombre_Unidad_Gestora'){
      this.opciones = this.formulario.Nombre_Unidad_Gestora
    }

    else if (filtroNombre == 'Tipo_Institucion'){
      this.opciones = this.formulario.Tipo_Institucion
    }
    else if (filtroNombre == 'Vigencia'){
      this.opciones = this.formulario.Vigencia
    }
    
    else if (filtroNombre == 'Nombre_Coordinador_Externo'){
      this.opciones = this.formulario.Nombre_Coordinador_Externo
    }
    else if (filtroNombre == 'Nombre_Coordinador_Interno'){
      this.opciones = this.formulario.Nombre_Coordinador_Interno
    }


  }


  
  ngOnInit() {
    this.hacerPeticion();
  }



  hacerPeticion() {
    const url = 'http://localhost:3000/api/convenios';
    this.http.get(url).subscribe((data: any) => {
      
      this.formulario.Alcance = [...new Set(data.map((convenio: { Alcance: any; }) => convenio.Alcance))];
      this.formulario.Anio_Firma = [...new Set(data.map((convenio: { Anio_Firma: any; }) => convenio.Anio_Firma))];
      this.formulario.Condicion_Renovacion = [...new Set(data.map((convenio: { Condicion_Renovacion: any; }) => convenio.Condicion_Renovacion))];
      this.formulario.Estatus = [...new Set(data.map((convenio: { Estatus: any; }) => convenio.Estatus))];
      this.formulario.Movilidad = [...new Set(data.map((convenio: { Movilidad: any; }) => convenio.Movilidad))];
      this.formulario.Nombre_Institucion = [...new Set(data.map((convenio: { Nombre_Institucion: any; }) => convenio.Nombre_Institucion))];
      this.formulario.Pais = [...new Set(data.map((convenio: { Pais: any; }) => convenio.Pais))];
      this.formulario.Tipo_Firma = [...new Set(data.map((convenio: { Tipo_Firma: any; }) => convenio.Tipo_Firma))];
      this.formulario.Vigencia = [...new Set(data.map((convenio: { Vigencia: any; }) => convenio.Vigencia))];
      this.formulario.Nombre_Unidad_Gestora = [...new Set(data.map((convenio: { Nombre_Unidad_Gestora: any; }) => convenio.Nombre_Unidad_Gestora))];
      this.formulario.Nombre_Coordinador_Externo = [...new Set(data.map((convenio: { Nombre_Coordinador_Externo: any; }) => convenio.Nombre_Coordinador_Externo))]; 
      this.formulario.Nombre_Coordinador_Interno = [...new Set(data.map((convenio: { Nombre_Coordinador_Interno: any; }) => convenio.Nombre_Coordinador_Interno))]; 
      
      console.log(data)
    })
  }
}





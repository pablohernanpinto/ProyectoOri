import { HttpClient } from '@angular/common/http';
import { Component,Injectable, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modals/modalInfo/modal.component';
import { ModalService } from '../header/modal.service';
import { DataSharingService } from './data-sharing.service';
import { FormControl } from '@angular/forms';
import { ModalGenerarReportesComponent } from '../modals/modal-generar-reportes/modal-generar-reportes.component';



@Component({
  selector: 'app-all-convenios',
  templateUrl: './all-convenios.component.html',
  styleUrls: ['./all-convenios.component.css']
})
export class AllConveniosComponent {
  conveniosTodo: any;
  constructor(private http: HttpClient,
  public dialog: MatDialog,
  private listado : ModalService,
  private dataSharingService: DataSharingService) { }

  opciones: any[] | undefined;
  myControl = new FormControl('');
  criteriosBusqueda:any [] = []
  data: any[] = [];
  filtrado:any[] = [];
  convenios: any[] = []; 
  conveniosCuatroMeses: any[] = []
  conveniosSeisMeses: any[] = []
  searchTerm: string = ''


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



  openModal(Index: number) {
    const dialogRef = this.dialog.open(ModalComponent, {data: {Index:Index}}); 
  }
    
  eliminarCriterio(index: number): void {

    this.criteriosBusqueda.splice(index, 1);
//    console.log(this.criteriosBusqueda)
    this.myControl = new FormControl('');
    this.enviarMensaje();
/*     setTimeout(() => {
      this.enviarMensaje();
    }, 500); */

  }


  Home(){

    window.location.reload();

  }

  Reporte(){

    const dialogRef = this.dialog.open(ModalGenerarReportesComponent,{data:this.convenios});

  }

  enviarMensaje(){
    this.filtrado = this.data
    if (this.myControl.value != ''){
      this.criteriosBusqueda.push(this.myControl.value)
    }
    else{
      this.convenios = this.conveniosTodo
    }
    for (let i = 0; i < this.criteriosBusqueda.length; i++) {
    const objetosEncontrados = this.filtrado.filter(objeto =>
      Object.values(objeto).some(valor =>
        String(valor).toUpperCase() === String(this.criteriosBusqueda[i]).toUpperCase()
      )
    );
    this.filtrado = []
    this.filtrado = objetosEncontrados
    this.convenios = this.filtrado;
    }
  }

  alarma(){
    this.conveniosCuatroMeses = []
    this.conveniosSeisMeses = []
    this.EnviarData()
    for (let i = 0; i < this.convenios.length; i++) {

      const partesFecha = this.convenios[i].Fecha_Termino.split('/');
      const year = parseInt('20' + partesFecha[2], 10); // Convertir a número
      const month = parseInt(partesFecha[1], 10) - 1; // Convertir a número y restar 1
      const day = parseInt(partesFecha[0], 10); // Convertir a número
      
      const fecha = new Date(year, month, day);


      const fechaCuatroMesesAntes = new Date(fecha);
      const fechaSeisMesesAntes = new Date(fecha);
      fechaCuatroMesesAntes.setMonth(fecha.getMonth() - 4);      
      fechaSeisMesesAntes.setMonth(fecha.getMonth() - 6);  

      const fechaActual = new Date();

      if (fechaCuatroMesesAntes < fechaActual) {
        this.conveniosCuatroMeses.push({
          ID_Convenio: this.convenios[i].ID_Convenio ,
          Fecha_Termino: this.convenios[i].Fecha_Termino,
          Nombre_Convenio: this.convenios[i].Nombre_Convenio,
          TipoAlerta: '4 meses'
        });
      }
      if (fechaSeisMesesAntes < fechaActual && fechaCuatroMesesAntes > fechaActual ) {
        this.conveniosSeisMeses.push({
          ID_Convenio: this.convenios[i].ID_Convenio ,
          Fecha_Termino: this.convenios[i].Fecha_Termino,
          Nombre_Convenio: this.convenios[i].Nombre_Convenio,
          TipoAlerta: '6 meses'
        });

      
      }
    }
    this.EnviarData()
  }




  EnviarData(){
    if((this.conveniosCuatroMeses.length + this.conveniosSeisMeses.length) > 0){
      this.dataSharingService.setImg('notification1.png')
    }
    else{
      this.dataSharingService.setImg('notification2.png')
    }
    this.dataSharingService.setLista1(this.conveniosCuatroMeses);
    this.dataSharingService.setLista2(this.conveniosSeisMeses);

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
    this.listado.disparadorDeBusqueda.subscribe(mensaje => {
      this.searchTerm = String(mensaje.mensaje);
    })

  }


  hacerPeticion() {
    const url = 'http://localhost:3000/api/convenios';
    this.http.get(url).subscribe((data: any) => {
      this.convenios = data;
      this.conveniosTodo = data
      this.alarma()
      this.data = data
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

    });
  }

}

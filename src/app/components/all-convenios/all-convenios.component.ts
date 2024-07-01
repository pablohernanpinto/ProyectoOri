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


  /////////////////////////////


  /////////////////////////////




  formulario = {
    alcance: [] as any[],
    anio_Firma:  [] as any[],
    condicion_Renovacion: [] as any[],
    estatus: [] as any[],
    movilidad:[] as any[],
    nombre_Institucion: [] as any[],
    pais: [] as any[],
    tipo_Firma: [] as any[],
    vigencia: [] as any[],
    nombre_Unidad_Gestora: [] as any[],
    tipo_Institucion: [] as any[],
    nombre_Coordinador_Externo: [] as any[],
    nombre_Coordinador_Interno: [] as any[],
  };



  openModal(Index: number) {

    const dialogRef = this.dialog.open(ModalComponent, {data: {Index:Index}}); 
  }
    
  eliminarCriterio(index: number): void {

    this.criteriosBusqueda.splice(index, 1);
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

      const partesFecha = this.convenios[i].fecha_Termino.split('-');
      const year = parseInt(partesFecha[2], 10); // Convertir a número
      const month = parseInt(partesFecha[1], 10) - 1; // Convertir a número y restar 1
      const day = parseInt(partesFecha[0], 10); // Convertir a número
      
      const fechaTermino = new Date(year, month, day);


      const fechaCuatroMesesAntes = new Date(fechaTermino);
      const fechaSeisMesesAntes = new Date(fechaTermino);
      fechaCuatroMesesAntes.setMonth(fechaTermino.getMonth() - 4);      
      fechaSeisMesesAntes.setMonth(fechaTermino.getMonth() - 6);  

      const fechaActual = new Date();

      //para pruebas
      const fecha1 = new Date(fechaTermino);
      const fecha2 = new Date(fechaTermino);
      fecha2.setMonth(fecha2.getMonth() - 4)

  
      if (fechaCuatroMesesAntes < fechaActual ) {

        this.conveniosCuatroMeses.push({
          ID_Convenio: this.convenios[i].iD_Convenio ,
          Fecha_Termino: this.convenios[i].fecha_Termino,
          Nombre_Convenio: this.convenios[i].nombre_Convenio,
          TipoAlerta: '4 meses'
        });
      }
      else if (fechaSeisMesesAntes < fechaActual && fechaCuatroMesesAntes > fechaActual ) {
        this.conveniosSeisMeses.push({
          ID_Convenio: this.convenios[i].iD_Convenio ,
          Fecha_Termino: this.convenios[i].fecha_Termino,
          Nombre_Convenio: this.convenios[i].nombre_Convenio,
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
      this.opciones = this.formulario.alcance
    }
    else if (filtroNombre == 'Anio_Firma'){
      this.opciones = this.formulario.anio_Firma
    }

    else if (filtroNombre == 'Condicion_Renovacion'){
      this.opciones = this.formulario.condicion_Renovacion
    }

    else if (filtroNombre == 'Estatus'){
      this.opciones = this.formulario.estatus
    }

    else if (filtroNombre == 'Movilidad'){
      this.opciones = this.formulario.movilidad
    }

    else if (filtroNombre == 'Nombre_Institucion'){
      this.opciones = this.formulario.nombre_Institucion
    }

    else if (filtroNombre == 'Pais'){
      this.opciones = this.formulario.pais
    }

    else if (filtroNombre == 'Tipo_Firma'){
      this.opciones = this.formulario.tipo_Firma
    }

    else if (filtroNombre == 'Nombre_Unidad_Gestora'){
      this.opciones = this.formulario.nombre_Unidad_Gestora
    }

    else if (filtroNombre == 'Tipo_Institucion'){
      this.opciones = this.formulario.tipo_Institucion
    }
    else if (filtroNombre == 'Vigencia'){
      this.opciones = this.formulario.vigencia
    }
    
    else if (filtroNombre == 'Nombre_Coordinador_Externo'){
      this.opciones = this.formulario.nombre_Coordinador_Externo
    }
    else if (filtroNombre == 'Nombre_Coordinador_Interno'){
      this.opciones = this.formulario.nombre_Coordinador_Interno
    }
  }

  ngOnInit() {
    this.hacerPeticion();
    this.listado.disparadorDeBusqueda.subscribe(mensaje => {
      this.searchTerm = String(mensaje.mensaje);
    })

  }


  hacerPeticion() {
    const url = 'https://localhost:7230/api/Convenio/';
    this.http.get(url).subscribe((data: any) => {
      this.convenios = data;
      this.conveniosTodo = data

      this.alarma()

      this.data = data

      this.formulario.alcance = [...new Set(data.map((convenio: { alcance: any; }) => convenio.alcance))];
      this.formulario.anio_Firma = [...new Set(data.map((convenio: { anio_Firma: any; }) => convenio.anio_Firma))];
      this.formulario.condicion_Renovacion = [...new Set(data.map((convenio: { condicion_Renovacion: any; }) => convenio.condicion_Renovacion))];
      this.formulario.estatus = [...new Set(data.map((convenio: { estatus: any; }) => convenio.estatus))];
      this.formulario.movilidad = [...new Set(data.map((convenio: { movilidad: any; }) => convenio.movilidad))];
      this.formulario.nombre_Institucion = [...new Set(data.map((convenio: { nombre_Institucion: any; }) => convenio.nombre_Institucion))];
      this.formulario.pais = [...new Set(data.map((convenio: { pais: any; }) => convenio.pais))];
      this.formulario.tipo_Firma = [...new Set(data.map((convenio: { tipo_Firma: any; }) => convenio.tipo_Firma))];
      this.formulario.vigencia = [...new Set(data.map((convenio: { vigencia: any; }) => convenio.vigencia))];
      this.formulario.nombre_Unidad_Gestora = [...new Set(data.map((convenio: { nombre_Unidad_Gestora: any; }) => convenio.nombre_Unidad_Gestora))];
      this.formulario.nombre_Coordinador_Externo = [...new Set(data.map((convenio: { nombre_Coordinador_Externo: any; }) => convenio.nombre_Coordinador_Externo))]; 
      this.formulario.nombre_Coordinador_Interno = [...new Set(data.map((convenio: { nombre_Coordinador_Interno: any; }) => convenio.nombre_Coordinador_Interno))]; 
      this.formulario.tipo_Institucion = [...new Set(data.map((convenio: { tipo_Institucion: any; }) => convenio.tipo_Institucion))];
      
    });
  }

}

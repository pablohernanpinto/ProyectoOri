import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modals/modalInfo/modal.component';
import { ModalService } from '../header/modal.service';
import { DataSharingService } from './data-sharing.service';


@Component({
  selector: 'app-all-convenios',
  templateUrl: './all-convenios.component.html',
  styleUrls: ['./all-convenios.component.css']
})
export class AllConveniosComponent {
  convenios: any[] = []; 
  conveniosCuatroMeses: any[] = []
  conveniosSeisMeses: any[] = []
  searchTerm: string = ''
  constructor(private http: HttpClient,
    public dialog: MatDialog,
    private listado : ModalService,
    private dataSharingService: DataSharingService) { }

  formulario:any[] = []


  openModal(Index: number) {
    const dialogRef = this.dialog.open(ModalComponent, {data: {Index:this.convenios[Index].ID_Convenio}});
  }
  

  filtrarConvenios() {
    return this.convenios.filter(convenio =>
      convenio.Alcance.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      convenio.Anio_Firma.toString().includes(this.searchTerm.toLowerCase()) ||
      convenio.Condicion_Renovacion.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      convenio.Correo_Coordinador_Externo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      convenio.Correo_Coordinador_Interno.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      convenio.Cupos.toString().includes(this.searchTerm.toLowerCase()) ||
      convenio.Documentos.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      convenio.Estatus.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      convenio.ID_Convenio.toString().includes(this.searchTerm.toLowerCase()) ||
      convenio.Movilidad.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      convenio.Nombre_Convenio.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      convenio.Nombre_Coordinador_Externo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      convenio.Nombre_Coordinador_Interno.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      convenio.Nombre_Institucion.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      convenio.Nombre_Unidad_Gestora.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      convenio.Pais.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      convenio.Tipo_Convenio.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      convenio.Tipo_Coordinador_Externo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      convenio.Tipo_Coordinador_Interno.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      convenio.Tipo_Firma.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      convenio.Tipo_Institucion.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      convenio.Vigencia.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
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
    console.log(this.conveniosCuatroMeses)
    if((this.conveniosCuatroMeses.length + this.conveniosSeisMeses.length) > 0){
      this.dataSharingService.setImg('notification1.png')
    }
    else{
      this.dataSharingService.setImg('notification2.png')
    }
    this.dataSharingService.setLista1(this.conveniosCuatroMeses);
    this.dataSharingService.setLista2(this.conveniosSeisMeses);

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
      this.alarma()

    });
  }
}

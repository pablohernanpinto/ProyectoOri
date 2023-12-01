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

    const dialogRef = this.dialog.open(ModalComponent, {data: {Index:Index}});
  }
  

    filtrarConvenios() {
    return this.convenios.filter(convenio =>
      convenio.Nombre_Convenio.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      convenio.Tipo_Convenio.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      convenio.Vigencia.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      convenio.Anio_Firma.toString().includes(this.searchTerm.toLowerCase()) ||
      convenio.Tipo_Firma.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  alarma(){
    
    //console.log(this.convenios)
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
      console.log(fechaCuatroMesesAntes,'anterior',fechaActual,'actual')
      if (fechaCuatroMesesAntes < fechaActual) {
        this.conveniosCuatroMeses.push({
          ID_Convenio: this.convenios[i].ID_Convenio ,
          Fecha_Termino: this.convenios[i].Fecha_Termino,
          Nombre_Convenio: this.convenios[i].Nombre_Convenio,
          TipoAlerta: '4 meses'
        });


        // La fecha está dentro de los próximos 4 meses
        //alert(Alerta);
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

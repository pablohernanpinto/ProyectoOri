import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modals/modalInfo/modal.component';
import { ModalService } from '../header/modal.service';

@Component({
  selector: 'app-all-convenios',
  templateUrl: './all-convenios.component.html',
  styleUrls: ['./all-convenios.component.css']
})
export class AllConveniosComponent {
  convenios: any[] = []; 
  searchTerm: string = ''
  constructor(private http: HttpClient,
    public dialog: MatDialog,
    private listado : ModalService) { }



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
      console.log(this.convenios)
    });
  }
}

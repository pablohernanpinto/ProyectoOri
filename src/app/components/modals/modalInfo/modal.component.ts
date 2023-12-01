import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';
import { LoginService } from 'src/guards/login.service';
import { ModificarConvenioComponent } from '../modificar-convenio/modificar-convenio.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  constructor(private http: HttpClient,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModalComponent>,
    public loginService: LoginService,
    @Inject(MAT_DIALOG_DATA) public data: {Index: number},
    public toast: NgToastService,
    ) { } // Corregido aquí
 
  convenios: any;
  mostrarEnPantalla: any;
  indexEnviar: number | undefined;

  closeDialog() {
    this.dialogRef.close('');
    window.location.reload();
  }

  ngOnInit() {
    this.hacerPeticion();
  }

  hacerPeticion() {
    const url = 'http://localhost:3000/api/convenios';
    this.http.get(url).subscribe((data: any) => {
      this.convenios = data;
      this.mostrarEnPantalla = (this.convenios[this.data.Index]);
      this.indexEnviar = this.data.Index
    });
  }

  delete() {
    this.http.delete('http://localhost:3000/api/convenios/'+this.mostrarEnPantalla.ID_Convenio)
    .subscribe();
    this.toast.error({detail:"ERROR",summary:'Your Error Message',sticky:true});
    alert('SE BORRÓ EL CONVENIO');
    window.location.reload();
  }  

  ModConvenio() {
    console.log(this.mostrarEnPantalla)
  const formularioModificacion = {
    id_convenio: this.mostrarEnPantalla.ID_Convenio,
    id_unidad_gestora: this.mostrarEnPantalla.ID_Unidad_Gestora,
    id_coordinadorInterno: this.mostrarEnPantalla.ID_Coordinador_Interno,
    id_coordinadorExterno: this.mostrarEnPantalla.ID_Coordinador_Externo,
    nombre_conv: this.mostrarEnPantalla.Nombre_Convenio,
    tipo_conv: this.mostrarEnPantalla.Tipo_Convenio,
    movilidad: this.mostrarEnPantalla.Movilidad,
    vigencia: this.mostrarEnPantalla.Vigencia,
    ano_firma:this.mostrarEnPantalla.Anio_Firma,
    tipo_firma: this.mostrarEnPantalla.Tipo_Firma,
    cupos: this.mostrarEnPantalla.Cupos,
    documentos: this.mostrarEnPantalla.Documentos,
    condicion_renovacion: this.mostrarEnPantalla.Condicion_Renovacion,
    estatus: this.mostrarEnPantalla.Estatus,
    fecha_inicio: this.mostrarEnPantalla.Fecha_Inicio,
    fecha_termino: this.mostrarEnPantalla.Fecha_Termino,
    nombreCoordinadorInterno: this.mostrarEnPantalla.Nombre_Coordinador_Interno,
    nombreCoordinadorExterno: this.mostrarEnPantalla.Nombre_Coordinador_Externo,
  }
  const dialogRef = this.dialog.open(ModificarConvenioComponent,{data: {formulario:formularioModificacion,Index: this.indexEnviar}});
  
  }  
}

import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddComComponent } from '../add-com/add-com.component';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';


@Component({
  selector: 'app-modificar-convenio',
  templateUrl: './modificar-convenio.component.html',
  styleUrls: ['./modificar-convenio.component.css']
})
export class ModificarConvenioComponent {


  constructor(
    public dialogRef: MatDialogRef<AddComComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.index = data.Index;
  }

  
  formulario = {
    id_unidad_gestora: '',
    id_coordinador: '',
    nombre_conv: '',
    tipo_conv: '',
    Movilidad:'',
    vigencia: '',
    ano_firma: '',
    tipo_firma: '',
    cupos: '',
    documentos: '',
    Condicion_Renovacion:'',
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

  tipoDeFirma: string[] = ['Digital', 'Fisica'];
  condicionRenovacion: string[] = ['6 meses', '3 meses'];
  MovilidadOpciones: string[] = ['Si', 'No'];


  index: any;
  formularioAntiguo:any[]= []

  closeDialog() {
    this.dialogRef.close('');
    window.location.reload();

  }

  FechaInicio(){
    let elementos = this.formulario.fecha_InicioSinFormato.split("-");
    this.formulario.fecha_inicio = elementos.reverse().join('/')
  }
  FechaFinal(){
    let elementos = this.formulario.fecha_FinalSinFormato.split("-");
    this.formulario.fecha_termino = elementos.reverse().join('/')

  }
  ngOnInit() {
    this.formulario = this.data.formulario
    console.log(this.formulario)
  }


  updateConvenio(formContact: NgForm) {
    console.log(this.formulario,'despues de ingresar')

     if (formContact.valid) {
      const url = `http://localhost:3000/api/convenios/`+this.index;
      this.http.put(url, this.formulario).subscribe(
        (data) => {
          alert('SE HA ACTUALIZADO LA INSTITUCIÓN');
          console.log(data);
          window.location.reload();
        },
        (error) => {
          alert('ERROR AL ACTUALIZAR LA INSTITUCIÓN');
          console.error(error);
          window.location.reload();
        }
      );
    } else {
      alert('INGRESO NO VÁLIDO');
    } 
  }


}

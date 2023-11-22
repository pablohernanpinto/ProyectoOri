import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddComComponent } from '../add-com/add-com.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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


  formularioCorrecto =  {
    id_unidad_gestora: 1,
    id_coordinador: 1,
    nombre_conv: " Convenio 1",
    tipo_conv: "Academico",
    movilidad: "Si",
    vigencia: "Vigente",
    ano_firma: 2023,
    tipo_firma: "Fisico",
    cupos: 69,
    documentos: "Documentos",
    condicion_renovacion: "6 Meses",
    estatus: "Activo",
    fecha_inicio: "20/11/23",
    fecha_termino: "20/11/28"
} 

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
    console.log(this.data.formulario.id_convenio)
  }


  updateConvenio(formContact: NgForm) {
      const url = 'http://localhost:3000/api/convenios/'+String(this.data.formulario.id_convenio);

      if (formContact.valid) {
      this.http.put(url,this.formulario).subscribe(
        (data) => {
          alert('SE HA ACTUALIZADO LA INSTITUCIÓN');
          console.log(data);
          window.location.reload(); 
        },
        (error) => {

          console.error(error);
          alert('SE HA ACTUALIZADO LA INSTITUCIÓN');
          window.location.reload(); 
        }
      );
    } else {
      alert('INGRESO NO VÁLIDO');
    }  
  }
}

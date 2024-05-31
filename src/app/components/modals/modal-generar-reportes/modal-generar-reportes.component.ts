import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddComComponent } from '../add-com/add-com.component';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

interface Convenio {
  Alcance: string;
  Anio_Firma: number;
  Condicion_Renovacion: string;
  Correo_Coordinador_Externo: string;
  Correo_Coordinador_Interno: string;
  Cupos: number;
  Documentos: string;
  Estatus: string;
  Fecha_Inicio: string;
  Fecha_Termino: string;
  ID_Convenio: number;
  ID_Coordinador_Externo: number;
  ID_Coordinador_Interno: number;
  ID_Institucion: number;
  ID_Unidad_Gestora: number;
  Movilidad: string;
  Nombre_Convenio: string;
  Nombre_Coordinador_Externo: string;
  Nombre_Coordinador_Interno: string;
  Nombre_Institucion: string;
  Nombre_Unidad_Gestora: string;
  Pais: string;
  Tipo_Convenio: string;
  Tipo_Coordinador_Externo: string;
  Tipo_Coordinador_Interno: string;
  Tipo_Firma: string;
  Tipo_Institucion: string;
  Vigencia: string;

  ID_CONVENIO: number;
  ID_UNIDAD_GESTORA: number,
  NOMBRE_CONV: string,
  TIPO_CONV: string,
  MOVILIDAD: string,
  VIGENCIA: string,
  ANO_FIRMA: number,
  TIPO_FIRMA: string,
  CUPOS: number,
  DOCUMENTOS: string,
  CONDICION_RENOVACION: string,
  ESTATUS: string,
  FECHA_INICIO: string,
  FECHA_TERMINO: string,
}

@Component({
  selector: 'app-modal-generar-reportes',
  templateUrl: './modal-generar-reportes.component.html',
  styleUrls: ['./modal-generar-reportes.component.css']
})
export class ModalGenerarReportesComponent {
  constructor(
    public dialogRef: MatDialogRef<AddComComponent>,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Convenio[],    
  ) { }
  
  inputValue: string = '';
  ArrayEnviar:any[] = [];
  ngOnInit() {

    this.arregloDeData();

  }

  arregloDeData() {
    // Crear un nuevo array para almacenar los elementos modificados
    const newArray = [];
  
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i]) {
        // Asignar nuevos nombres a las propiedades
        this.data[i].ID_CONVENIO = this.data[i].ID_Convenio;
        this.data[i].ID_UNIDAD_GESTORA = this.data[i].ID_Unidad_Gestora;
        this.data[i].NOMBRE_CONV = this.data[i].Nombre_Convenio;
        this.data[i].TIPO_CONV = this.data[i].Tipo_Convenio;
        this.data[i].MOVILIDAD = this.data[i].Movilidad;
        this.data[i].VIGENCIA = this.data[i].Vigencia;
        this.data[i].ANO_FIRMA = this.data[i].Anio_Firma;
        this.data[i].TIPO_FIRMA = this.data[i].Tipo_Firma;
        this.data[i].CUPOS = this.data[i].Cupos;
        this.data[i].DOCUMENTOS = this.data[i].Documentos;
        this.data[i].CONDICION_RENOVACION = this.data[i].Condicion_Renovacion;
        this.data[i].ESTATUS = this.data[i].Estatus;
        this.data[i].FECHA_INICIO = this.data[i].Fecha_Inicio;
        this.data[i].FECHA_TERMINO = this.data[i].Fecha_Termino;
  
        // Eliminar propiedades antiguas
  
        // Agregar el elemento modificado al nuevo array

      }
    }

    for (let i = 0; i < this.data.length; i++) {
      this.ArrayEnviar.push(this.data[i])
      
    }
    
  }

  eliminarDeLista(id:number){
    console.log(this.data)
    this.data = this.data.filter(convenio => convenio.ID_Convenio !== id);
  }

// Recorrer el objeto y agregar elementos al nuevo array
  
  closeDialog() {
    this.dialogRef.close('');
    window.location.reload();

  }


  generarPDF() {
    if (true) {
      console.log(this.data)
      // Hacer la solicitud al servidor para obtener el PDF
      this.http.post('http://localhost:3000/api/generarInformePDF', this.data, { responseType: 'arraybuffer' }).subscribe(
        (data: ArrayBuffer) => {
          // Crear un Blob a partir de los datos del PDF
          const blob = new Blob([data], { type: 'application/pdf' });
  
          // Crear una URL para el Blob y abrir una nueva ventana/tabulación del navegador
          const url = window.URL.createObjectURL(blob);
          window.open(url);
        },
        (error) => {
          alert('ERROR AL GENERAR EL INFORME PDF');
          console.error(error);
        }
      );
    } else {
      alert('INGRESO NO VÁLIDO');
    }
  }
  

 

}

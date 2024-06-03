import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddComComponent } from '../add-com/add-com.component';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';

interface Convenio {
  alcance: string;
  anio_Firma: number;
  condicion_Renovacion: string;
  correo_Coordinador_Externo: string;
  correo_Coordinador_Interno: string;
  estatus: string;
  iD_Convenio: number;
  iD_Coordinador_Externo: number;
  iD_Coordinador_Interno: number;
  iD_Institucion: number;
  nombre_Convenio: string;
  nombre_Coordinador_Externo: string;
  nombre_Coordinador_Interno: string;
  nombre_Institucion: string;
  nombre_Unidad_Gestora: string;
  pais: string;
  tipo_Convenio: string;
  tipo_Coordinador_Externo: string;
  tipo_Coordinador_Interno: string;
  tipo_Institucion: string;
  iD_Unidad_Gestora: number,
  movilidad: string,
  vigencia: string,
  tipo_Firma: string,
  cupos: number,
  documentos: string,
  fecha_Inicio: string,
  fecha_Termino: string,
}

/* [ { "iD_Convenio": 3,
 "nombre_Convenio": "",
  "tipo_Convenio": "caca",
   "movilidad": "SI",
    "vigencia": "123", 
    "anio_Firma": 123, 
    "tipo_Firma": "Fisica",
     "cupos": 123,
      "documentos": "123", 
      "condicion_Renovacion": "Indefinido",
       "estatus": "Activo", 
       "fecha_Inicio": "08-05-2024", 
       "fecha_Termino": "31-08-2024",
        "iD_Institucion": 2,
         "nombre_Institucion": "asd123",
          "iD_Unidad_Gestora": 5, 
          "nombre_Unidad_Gestora": "asd", 
          "pais": "asd123",
           "alcance": "Internacional",
            "tipo_Institucion": "as123",
             "iD_Coordinador_Externo": 2,
              "tipo_Coordinador_Externo": "Externo",
               "nombre_Coordinador_Externo": "asd",
                "correo_Coordinador_Externo": "asdasdas", 
                "iD_Coordinador_Interno": 3, 
                "tipo_Coordinador_Interno": "Interno", 
                "nombre_Coordinador_Interno": "qwewqewq", 
                "correo_Coordinador_Interno": "asdasdasd" }, */

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
  
  convenios = this.data
  inputValue: string = '';
  ArrayEnviar:any[] = [];
  ngOnInit() {

  }

  eliminarDeLista(id:number){
    this.data = this.data.filter(convenio => convenio.iD_Convenio !== id);
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
      this.http.post('https://localhost:7230/api/Convenio/generarInformePdf', this.data, { responseType: 'arraybuffer' }).subscribe(
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

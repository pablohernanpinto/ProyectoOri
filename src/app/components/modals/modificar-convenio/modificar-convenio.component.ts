import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddComComponent } from '../add-com/add-com.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormControl, NgForm } from '@angular/forms';
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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.index = data.Index;
  }


  formularioModificar = this.formBuilder.group( {
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

    
    id_unidad_gestora: '',
    id_coordinador_externo:'',
    id_coordinador_interno:'',

    fecha_InicioSinFormato: new FormControl<Date | null>(null),
    fecha_FinalSinFormato: new FormControl<Date | null>(null),
    nombre_unidadGestora: '',
    nombreCoordinadorExterno: '',
    nombre_institucion: '',
  }); 


  formulario =  {
    nombre_conv: '',
    tipo_Convenio: '',
    movilidad:'',
    vigencia: '',
    anio_Firma: '',
    tipo_Firma: '',
    cupos: '',
    documentos: '',
    condicion_Renovacion:'',
    iD_Institucion: '',
    estatus:'Activo',
    fecha_Inicio: '',
    fecha_Termino: '',
    nombre_Convenio:'',
    iD_Unidad_Gestora:'',
    iD_Coordinador_Externo:'',
    iD_Coordinador_Interno:'',


    fecha_InicioSinFormato:new FormControl<Date | null>(null),
    fecha_FinalSinFormato:new FormControl<Date | null>(null),
    nombre_Unidad_Gestora: '',
    nombre_Coordinador_Externo: '',
    nombre_Institucion: '',
  }; 

  formularioEnviar = {
    id_unidad_gestora: 0,
    id_coordinador_externo: 0,
    id_coordinador_interno:0 ,
    nombre_conv: '',
    tipo_conv: '',
    movilidad:'' ,
    vigencia:'',
    ano_firma: 0,
    tipo_firma:'' ,
    cupos: '',
    documentos:'',
    condicion_renovacion:'',
    estatus: '',
    fecha_inicio: '',
    fecha_termino:'',
  }

  index: any;

  closeDialog() {
    this.dialogRef.close('');
    window.location.reload();

  }

  ngOnInit() {
    this.formulario = this.data.formulario
  }


  formatFecha(){
    this.formularioModificar.value.fecha_inicio = (this.formularioModificar.value.fecha_InicioSinFormato?.toLocaleDateString('es-CL'))?.replaceAll('-','/')
    this.formularioModificar.value.fecha_termino = (this.formularioModificar.value.fecha_FinalSinFormato?.toLocaleDateString('es-CL'))?.replaceAll('-','/')
  }
  addCampos(){

    this.formularioModificar.value.id_unidad_gestora = this.formulario.iD_Unidad_Gestora
    this.formularioModificar.value.id_coordinador_externo = this.formulario.iD_Coordinador_Externo
    this.formularioModificar.value.id_coordinador_interno = this.formulario.iD_Coordinador_Interno
    this.formularioModificar.value.id_institucion = this.formulario.iD_Institucion
    this.formularioModificar.value.nombre_institucion = this.formulario.nombre_Institucion
    this.formularioModificar.value.nombre_unidadGestora = this.formulario.nombre_Unidad_Gestora

    console.log(this.formularioModificar.value,'addcampos')
 
    if (this.formularioModificar.value.nombre_conv != ''){
      this.formulario.nombre_conv  = this.formularioModificar.value.nombre_conv || '' 
    }
    
    if (this.formularioModificar.value.tipo_conv != ''){
      this.formulario.tipo_Convenio  = this.formularioModificar.value.tipo_conv || '' 
    }
    
    if (this.formularioModificar.value.movilidad != ''){
      this.formulario.movilidad  = this.formularioModificar.value.movilidad || '' 
    }
    
    if (this.formularioModificar.value.vigencia != ''){
      this.formulario.vigencia  = this.formularioModificar.value.vigencia || '' 
    }
    
    if (this.formularioModificar.value.ano_firma != ''){
      this.formulario.anio_Firma  = this.formularioModificar.value.ano_firma || '' 
    }
    
    if (this.formularioModificar.value.tipo_firma != ''){
      this.formulario.tipo_Firma  = this.formularioModificar.value.tipo_firma || '' 
    }
    
    if (this.formularioModificar.value.cupos != ''){
      this.formulario.cupos  = this.formularioModificar.value.cupos || '' 
    }
    if (this.formularioModificar.value.documentos != ''){
      this.formulario.documentos  = this.formularioModificar.value.documentos || '' 
    }
    
    if (this.formularioModificar.value.condicion_renovacion != ''){
      this.formulario.condicion_Renovacion  = this.formularioModificar.value.condicion_renovacion || '' 
    }
    
    if (this.formularioModificar.value.estatus != ''){
      this.formulario.estatus  = this.formularioModificar.value.estatus || '' 
    }

    if (this.formularioModificar.value.fecha_inicio != undefined ){
      this.formulario.fecha_Inicio  = this.formularioModificar.value.fecha_inicio || '' 
    }
    if (this.formularioModificar.value.fecha_termino != undefined ){

      this.formulario.fecha_Termino  = this.formularioModificar.value.fecha_termino || '' 
    }

  }

  arreglarEnvio(){
    this.formularioEnviar.id_unidad_gestora = Number(this.formulario.iD_Unidad_Gestora)
    this.formularioEnviar.id_coordinador_externo = Number(this.formulario.iD_Coordinador_Externo)
    this.formularioEnviar.id_coordinador_interno = Number(this.formulario.iD_Coordinador_Interno)
    this.formularioEnviar.nombre_conv = this.formulario.nombre_conv
    this.formularioEnviar.tipo_conv = this.formulario.tipo_Convenio
    this.formularioEnviar.movilidad = this.formulario.movilidad
    this.formularioEnviar.vigencia = this.formulario.vigencia
    this.formularioEnviar.ano_firma = Number(this.formulario.anio_Firma)
    this.formularioEnviar.tipo_firma = this.formulario.tipo_Firma
    this.formularioEnviar.cupos = this.formulario.cupos
    this.formularioEnviar.documentos = this.formulario.documentos
    this.formularioEnviar.condicion_renovacion = this.formulario.condicion_Renovacion
    this.formularioEnviar.estatus = this.formulario.estatus
    this.formularioEnviar.fecha_inicio = this.formulario.fecha_Inicio
    this.formularioEnviar.fecha_termino = this.formulario.fecha_Termino
  }

  updateConvenio() {

    this.formatFecha()
    this.addCampos()
    this.arreglarEnvio()
    const url = 'https://localhost:7230/api/Convenio/'+String(this.data.formulario.iD_Convenio);
    console.log(this.formularioEnviar,'esto es lo que se envia')
    if (this.formularioModificar.valid) {
      this.http.put(url,this.formularioEnviar).subscribe(
        (data) => {
          alert('SE HA ACTUALIZADO LA INSTITUCIÓN');
          //console.log(data);
        //  window.location.reload(); 
        },
        (error) => {

          console.error(error);
          alert('SE HA ACTUALIZADO LA INSTITUCIÓN');
        //  window.location.reload(); 
        }
      );
    } else {
      alert('INGRESO NO VÁLIDO');
    }   
  }
}

/* {
    "iD_Convenio": 1,
    "nombre_Convenio": "123",
    "tipo_Convenio": "123",
    "movilidad": "SI",
    "vigencia": "123",
    "anio_Firma": 3,
    "tipo_Firma": "Fisica",
    "cupos": 123,
    "documentos": "123",
    "condicion_Renovacion": "Solicitar seis meses antes",
    "estatus": "Activo",
    "fecha_Inicio": "06-03-2024",
    "fecha_Termino": "31-03-2024",
    "iD_Institucion": 3,
    "nombre_Institucion": "asdasd",
    "iD_Unidad_Gestora": 6,
    "nombre_Unidad_Gestora": "asdasdasd",
    "pais": "asdasdads",
    "alcance": "Internacional",
    "tipo_Institucion": "asdasdasd",
    "iD_Coordinador_Externo": 5,
    "tipo_Coordinador_Externo": "Externo",
    "nombre_Coordinador_Externo": "deigonza",
    "correo_Coordinador_Externo": "fiegoasd",
    "iD_Coordinador_Interno": 1,
    "tipo_Coordinador_Interno": "Interno",
    "nombre_Coordinador_Interno": "asd",
    "correo_Coordinador_Interno": "sd"
} */
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

    id_unidad_gestora:'',
    id_coordinador_externo:'',
    id_coordinador_interno:'',


    fecha_InicioSinFormato:new FormControl<Date | null>(null),
    fecha_FinalSinFormato:new FormControl<Date | null>(null),
    nombre_unidadGestora: '',
    nombreCoordinadorExterno: '',
    nombre_institucion: '',
  }; 

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
    this.formularioModificar.value.id_unidad_gestora = this.formulario.id_unidad_gestora
    this.formularioModificar.value.id_coordinador_externo = this.formulario.id_coordinador_externo
    this.formularioModificar.value.id_coordinador_interno = this.formulario.id_coordinador_interno
    this.formularioModificar.value.id_institucion = this.formulario.id_institucion
    this.formularioModificar.value.nombre_institucion = this.formulario.nombre_institucion
    this.formularioModificar.value.nombre_unidadGestora = this.formulario.nombre_unidadGestora

 
    if (this.formularioModificar.value.nombre_conv != ''){
      this.formulario.nombre_conv  = this.formularioModificar.value.nombre_conv || '' 
    }
    
    if (this.formularioModificar.value.tipo_conv != ''){
      this.formulario.tipo_conv  = this.formularioModificar.value.tipo_conv || '' 
    }
    
    if (this.formularioModificar.value.movilidad != ''){
      this.formulario.movilidad  = this.formularioModificar.value.movilidad || '' 
    }
    
    if (this.formularioModificar.value.vigencia != ''){
      this.formulario.vigencia  = this.formularioModificar.value.vigencia || '' 
    }
    
    if (this.formularioModificar.value.ano_firma != ''){
      this.formulario.ano_firma  = this.formularioModificar.value.ano_firma || '' 
    }
    
    if (this.formularioModificar.value.tipo_firma != ''){
      this.formulario.tipo_firma  = this.formularioModificar.value.tipo_firma || '' 
    }
    
    if (this.formularioModificar.value.cupos != ''){
      this.formulario.cupos  = this.formularioModificar.value.cupos || '' 
    }
    if (this.formularioModificar.value.documentos != ''){
      this.formulario.documentos  = this.formularioModificar.value.documentos || '' 
    }
    
    if (this.formularioModificar.value.condicion_renovacion != ''){
      this.formulario.condicion_renovacion  = this.formularioModificar.value.condicion_renovacion || '' 
    }
    
    if (this.formularioModificar.value.id_institucion != ''){
      this.formulario.id_institucion  = this.formularioModificar.value.id_institucion || '' 
    }
    
    if (this.formularioModificar.value.estatus != ''){
      this.formulario.estatus  = this.formularioModificar.value.estatus || '' 
    }

    if (this.formularioModificar.value.fecha_inicio != '' ){
      this.formulario.fecha_inicio  = this.formularioModificar.value.fecha_inicio || '' 
    }
    if (this.formularioModificar.value.fecha_termino != '' ){

      this.formulario.fecha_termino  = this.formularioModificar.value.fecha_termino || '' 
    }

    if (this.formularioModificar.value.id_institucion != ''){
      this.formulario.id_institucion  = this.formularioModificar.value.id_institucion || '' 
    }
    
    if (this.formularioModificar.value.id_institucion != ''){
      this.formulario.id_institucion  = this.formularioModificar.value.id_institucion || '' 
    }
    
    if (this.formularioModificar.value.id_institucion != ''){
      this.formulario.id_institucion  = this.formularioModificar.value.id_institucion || '' 
    }
    
    if (this.formularioModificar.value.id_institucion != ''){
      this.formulario.id_institucion  = this.formularioModificar.value.id_institucion || '' 
    }
    
    if (this.formularioModificar.value.id_institucion != ''){
      this.formulario.id_institucion  = this.formularioModificar.value.id_institucion || '' 
    }
    
    if (this.formularioModificar.value.id_institucion != ''){
      this.formulario.id_institucion  = this.formularioModificar.value.id_institucion || '' 
    }
    
    if (this.formularioModificar.value.id_institucion != ''){
      this.formulario.id_institucion  = this.formularioModificar.value.id_institucion || '' 
    }

  }



  updateConvenio() {
    this.formatFecha()
    this.addCampos()
    const url = 'http://localhost:3000/api/convenios/'+String(this.data.formulario.id_convenio);


    //console.log(this.formularioModificar.value)
 
       if (this.formularioModificar.valid) {
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

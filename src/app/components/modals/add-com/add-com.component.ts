import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-add-com',
  templateUrl: './add-com.component.html',
  styleUrls: ['./add-com.component.css']
})
export class AddComComponent {


  constructor(private http: HttpClient,public dialog: MatDialog,public dialogRef: MatDialogRef<AddComComponent>,private formBuilder: FormBuilder) { }
  inicioDatepicker: any
  url = 'https://localhost:7230';

  formulario = this.formBuilder.group({
    id_unidad_gestora: '',
    nombre_conv: '',
    tipo_conv: '',
    movilidad:'',
    vigencia:'',
    ano_firma:'',
    tipo_firma:'',
    cupos:'',
    documentos:'',
    condicion_renovacion:'',
    id_institucion:'',
    estatus:'Activo',
    fecha_inicio:'',
    fecha_termino:'',
    id_coordinador_externo: '',
    id_coordinador_interno: '',


    fecha_InicioSinFormato: new FormControl<Date | null>(null),
    fecha_FinalSinFormato: new FormControl<Date | null>(null),
    nombre_unidadGestora:'',
    nombre_coordinador:'',
    nombre_institucion:'',
    nombre_coordinador_Externo:'',
    nombre_coordinador_Interno:'',

  })

  /* {
  "id_unidad_gestora": 0,
  "id_coordinador_externo": 0,
  "id_coordinador_interno": 0,
  "nombre_conv": "string",
  "tipo_conv": "string",
  "movilidad": "string",
  "vigencia": "string",
  "ano_firma": 0,
  "tipo_firma": "string",
  "cupos": 0,
  "documentos": "string",
  "condicion_renovacion": "string",
  "estatus": "string",
  "fecha_inicio": "string",
  "fecha_termino": "string"
} */

  //obtener coordinadores internos

  coordinadoresInternos: any[] = [];
  NombreCoordinadorInterno: any[]=[];
  ID_CoordinadorInterno: any[] = [];

  //obtener coordinadores Externos
  coordinadores:any[] = [];
  coordinadoresNombres:any[] = [];
  idCoordinadores: string[] = []; 
  coordinadoresDisponibles: any[] | undefined;

  //unidad gestora
  optionsUnidadGestora: string[] = []; 
  idUnidadGestora: any[] = [];
  unidadGestora: any[] = [];
  unidadGestoraDisponible: any[] | undefined;

  //obtener institucion
  instituciones: any[] =[];
  idInstitucion: any[] = [];
  NombreInstitucion: any[] = [];
  idDeLLamadoInstitucion:any[] = [];

  ngOnInit() {
    this.PedirInstitucion();
  }

 onOptionSelected() {
    this.coordinadoresNombres = [];
    this.optionsUnidadGestora = [];
    this.idCoordinadores = [];
    this.idUnidadGestora = [];
    this.formulario.value.nombre_coordinador = ''
    this.formulario.value.nombre_unidadGestora = ''

    const indexSelect = this.idInstitucion[this.NombreInstitucion.indexOf(this.formulario.value.nombre_institucion)]
    this.formulario.value.id_institucion = this.idInstitucion[this.NombreInstitucion.indexOf(this.formulario.value.nombre_institucion)]


    this.coordinadoresDisponibles = this.coordinadores.filter((objeto) => objeto.idInstitucion === indexSelect); 


    this.unidadGestoraDisponible = this.unidadGestora.filter((objeto) => objeto.idInstitucion === indexSelect); 
  console.log(this.unidadGestoraDisponible)
    for (let i = 0; i < this.coordinadoresDisponibles.length; i++) {
      this.coordinadoresNombres.push(this.coordinadoresDisponibles[i].nombre)
      this.idCoordinadores.push(this.coordinadoresDisponibles[i].idCoordinador)
    }
    
    for (let i = 0; i < this.unidadGestoraDisponible.length; i++) {

      this.optionsUnidadGestora.push(this.unidadGestoraDisponible[i].nombreUnidad)
      this.idUnidadGestora.push(this.unidadGestoraDisponible[i].idUnidadGestora)
    }



  }   

  IDunidadGestora(){
    this.formulario.value.id_unidad_gestora = this.idUnidadGestora[this.optionsUnidadGestora.indexOf(String(this.formulario.value.nombre_unidadGestora))];

  }


  IDinstitucion(){
    this.formulario.value.id_institucion = this.idInstitucion[this.NombreInstitucion.indexOf(this.formulario.value.nombre_institucion)]
  
  }
  

  formatFecha(){
    this.formulario.value.fecha_inicio = (this.formulario.value.fecha_InicioSinFormato?.toLocaleDateString('es-CL'))?.replaceAll('-','/')
    this.formulario.value.fecha_termino = (this.formulario.value.fecha_FinalSinFormato?.toLocaleDateString('es-CL'))?.replaceAll('-','/')
    
  }

  coordinadoresAgregarID(){
    this.formulario.value.id_coordinador_interno = this.ID_CoordinadorInterno[this.NombreCoordinadorInterno.indexOf(String(this.formulario.value.nombre_coordinador_Interno))]
    this.formulario.value.id_coordinador_externo = this.idCoordinadores[this.coordinadoresNombres.indexOf(String(this.formulario.value.nombre_coordinador))];


  }

  addConvenio() {
    this.IDunidadGestora()
    this.IDinstitucion()
    this.formatFecha()
    this.coordinadoresAgregarID()

       if (this.formulario.valid) {
        this.http.post(this.url+'/api/Convenio', this.formulario.value).subscribe(
            (data) => {
              
              alert('CONVENIO INGRESADO');
/*               window.location.reload(); 
 */

            },
            
            (error) => {
              console.log(this.formulario.value)
              alert('ERROR AL INGRESAR CONVENIO');
              console.error(error);
/*               window.location.reload(); 
 */            }
          );
      } else {
        alert('INGRESO NO VÁLIDO');
      }   
    }
  
    
  closeDialog() {
    this.dialogRef.close('');
    window.location.reload();
  }


  PedirInstitucion() {
    this.http.get(this.url+'/api/UnidadGestora/').subscribe((data: any) => {
      this.unidadGestora = data;
    });

    this.http.get(this.url+'/api/Institucion/').subscribe((data: any) => {
      this.instituciones = data;
      for (let i = 0; i < this.instituciones.length; i++) {
        if (this.instituciones[i].Nombre_Institucion != "Universidad Catolica Del Maule"){
          this.NombreInstitucion.push(this.instituciones[i].nombreInstitucion)
          this.idInstitucion.push(this.instituciones[i].idInstitucion)
  
          }
        }
      });

    this.http.get(this.url+'/api/coordinador').subscribe((data: any) => {
      console.log(data,'thsi')
      this.coordinadores = data;
    });

    this.http.get(this.url+'/api/Coordinador/listarCoordinadoresInternos').subscribe((data: any) => {
      this.coordinadoresInternos = data;
      for (let i = 0; i < data.length; i++) {
        this.ID_CoordinadorInterno.push(data[i].id_Coordinador)
        this.NombreCoordinadorInterno.push(data[i].nombre)
        } 
    });
    

  }
}




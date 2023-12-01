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
  url = 'http://localhost:3000/api/';

/*   formulario = {
    id_unidad_gestora: '',
    id_coordinador: '',
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
 */
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


  tipoDeFirma: string[] = ['Digital', 'Fisica'];
  condicionRenovacion: string[] = ['6 meses', '3 meses'];
  MovilidadOpciones: string[] = ['Si', 'No'];

  

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
    this.coordinadoresDisponibles = this.coordinadores.filter((objeto) => objeto.ID_Institucion === indexSelect); 
    this.unidadGestoraDisponible = this.unidadGestora.filter((objeto) => objeto.ID_Institucion === indexSelect); 

    for (let i = 0; i < this.coordinadoresDisponibles.length; i++) {
      this.coordinadoresNombres.push(this.coordinadoresDisponibles[i].Nombre)
      this.idCoordinadores.push(this.coordinadoresDisponibles[i].ID_Coordinador)
    }
    
    for (let i = 0; i < this.unidadGestoraDisponible.length; i++) {

      this.optionsUnidadGestora.push(this.unidadGestoraDisponible[i].Nombre_Unidad_Gestora)
      this.idUnidadGestora.push(this.unidadGestoraDisponible[i].ID_Unidad_Gestora)
    }
  }   

  IDunidadGestora(){
    this.formulario.value.id_unidad_gestora = this.idUnidadGestora[this.optionsUnidadGestora.indexOf(String(this.formulario.value.nombre_unidadGestora))];

  }

  
  IDcoordinador(){

  }

  IDinstitucion(){
    this.formulario.value.id_institucion = this.idInstitucion[this.NombreInstitucion.indexOf(this.formulario.value.nombre_institucion)]
  
  }
  

  formatFecha(){
    this.formulario.value.fecha_inicio = (this.formulario.value.fecha_InicioSinFormato?.toLocaleDateString('es-CL'))?.replaceAll('-','/')
    this.formulario.value.fecha_termino = (this.formulario.value.fecha_FinalSinFormato?.toLocaleDateString('es-CL'))?.replaceAll('-','/')
    
  }

  coordinadoresAgregarID(){
    console.log(this.NombreCoordinadorInterno.indexOf(String(this.formulario.value.nombre_coordinador_Interno)))
    this.formulario.value.id_coordinador_interno = this.ID_CoordinadorInterno[this.NombreCoordinadorInterno.indexOf(String(this.formulario.value.nombre_coordinador_Interno))]
    this.formulario.value.id_coordinador_externo = this.idCoordinadores[this.coordinadoresNombres.indexOf(String(this.formulario.value.nombre_coordinador))];
    console.log(this.formulario.value)

  }

  addConvenio() {
    this.IDunidadGestora()
    this.IDcoordinador()
    this.IDinstitucion()
    this.formatFecha()
    this.coordinadoresAgregarID()
       if (this.formulario.valid) {
        this.http.post('http://localhost:3000/api/convenios', this.formulario.value).subscribe(
            (data) => {
              alert('CONVENIO INGRESADO');
              window.location.reload();

            },
            (error) => {
              alert('ERROR AL INGRESAR CONVENIO');
              console.error(error);
            }
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
    this.http.get(this.url+'unidad_gestora/').subscribe((data: any) => {
      this.unidadGestora = data;
    });

    this.http.get(this.url+'instituciones/').subscribe((data: any) => {
      this.instituciones = data;
      for (let i = 0; i < this.instituciones.length; i++) {
        this.NombreInstitucion.push(this.instituciones[i].Nombre_Institucion)
        this.idInstitucion.push(this.instituciones[i].id)
        }
      });

    this.http.get(this.url+'coordinadores/').subscribe((data: any) => {
      this.coordinadores = data;
    });

    this.http.get(this.url+'listarCoordinadoresInternos/').subscribe((data: any) => {
      this.coordinadoresInternos = data;
      for (let i = 0; i < data.length; i++) {
        this.ID_CoordinadorInterno.push(data[i].ID_Coordinador)
        this.NombreCoordinadorInterno.push(data[i].Nombre)
        } 
      console.log(this.coordinadoresInternos,'data')
    });
    

  }
}




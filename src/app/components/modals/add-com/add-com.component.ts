import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-add-com',
  templateUrl: './add-com.component.html',
  styleUrls: ['./add-com.component.css']
})
export class AddComComponent {
  constructor(private http: HttpClient,public dialog: MatDialog,public dialogRef: MatDialogRef<AddComComponent>) { }

  url = 'http://localhost:3000/api/';

  formulario = {
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

  //obtener coordinadores
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
    this.formulario.nombre_coordinador = ''
    this.formulario.nombre_unidadGestora = ''

    const indexSelect = this.idInstitucion[this.NombreInstitucion.indexOf(this.formulario.nombre_institucion)]
    this.formulario.id_institucion = this.idInstitucion[this.NombreInstitucion.indexOf(this.formulario.nombre_institucion)]
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
    const indexSelect = this.idUnidadGestora[this.optionsUnidadGestora.indexOf(this.formulario.nombre_unidadGestora)]
    this.formulario.id_unidad_gestora = indexSelect;
  }

  
  IDcoordinador(){
    const indexSelect = this.idCoordinadores[this.coordinadoresNombres.indexOf(this.formulario.nombre_coordinador)]
    this.formulario.id_coordinador = indexSelect;
  }

  FechaInicio(){
    let elementos = this.formulario.fecha_InicioSinFormato.split("-");
    this.formulario.fecha_inicio = elementos.reverse().join('/')
  }
  FechaFinal(){
    let elementos = this.formulario.fecha_FinalSinFormato.split("-");
    this.formulario.fecha_termino = elementos.reverse().join('/')
    console.log(this.formulario)
  }

  addConvenio(formContact: NgForm) {
    console.log(this.formulario, ' ingreso')
      if (formContact.valid) {
        this.http.post('http://localhost:3000/api/convenios', this.formulario).subscribe(
            (data) => {
              alert('CONVENIO INGRESADO');
              //window.location.reload();

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
  }
}




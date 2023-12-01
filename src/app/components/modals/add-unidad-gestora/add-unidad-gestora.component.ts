import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddComComponent } from '../add-com/add-com.component';
import { HttpClient } from '@angular/common/http';
import { FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-add-unidad-gestora',
  templateUrl: './add-unidad-gestora.component.html',
  styleUrls: ['./add-unidad-gestora.component.css']
})
export class AddUnidadGestoraComponent {


  constructor(public dialogRef: MatDialogRef<AddComComponent>,private http: HttpClient,private formBuilder: FormBuilder) { }
  url = 'http://localhost:3000/api/';
  

  selectedIndexIns: number | undefined;

  optionsInstituciones: string[] = []; 
  optionsCoor: string[] = []; 
  Instituciones: any[] = [];
  idInstituciones: any[] = [];
  idCoor: any[] = [];


  closeDialog() {
    this.dialogRef.close('');
    window.location.reload();

  }

   formulario = this.formBuilder.group({
    id_institucion: '',
    nombre_unidad: '',
    nombreInstitucion: ''

  })
 

  ngOnInit() {
    this.hacerPeticion();

  }

  hacerPeticion() {
    this.http.get(this.url+'nombresInstituciones/').subscribe((data: any) => {
      this.Instituciones = data;
//      console.log(this.Instituciones,'aqio')
      if (Array.isArray(this.Instituciones)) {
        for (let i = 0; i < this.Instituciones.length; i++) {
          this.optionsInstituciones.push(this.Instituciones[i].Nombre_Institucion)
          this.idInstituciones.push(this.Instituciones[i].ID_Institucion)
        }
    //  console.log( this.optionsInstituciones,'nombres',this.idInstituciones,'id')
       }
    });
  }

  obtenerIndex(){
    this.formulario.value.id_institucion = this.idInstituciones[this.optionsInstituciones.indexOf(String(this.formulario.value.nombreInstitucion))]
  }

  addUnidadGestora() {
    this.obtenerIndex()
    if (this.formulario.valid) {
      this.http.post('http://localhost:3000/api/unidad_gestora', this.formulario.value).subscribe(
          (data) => {
            alert('SE HA INGRESADO UNIDAD GESTORA');
            //  window.location.reload();
      //        console.log(data);
              window.location.reload();
          
            },
            (error) => {
              alert('ERROR AL INGRESAR UNIDAD GESTORA');
              console.error(error);
              window.location.reload();
  
            }
          );
      } else {
        alert('INGRESO NO VÁLIDO');
      }   
    }
  }



  


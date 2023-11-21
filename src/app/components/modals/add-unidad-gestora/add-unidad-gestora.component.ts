import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddComComponent } from '../add-com/add-com.component';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-unidad-gestora',
  templateUrl: './add-unidad-gestora.component.html',
  styleUrls: ['./add-unidad-gestora.component.css']
})
export class AddUnidadGestoraComponent {


  constructor(public dialogRef: MatDialogRef<AddComComponent>,private http: HttpClient) { }
  url = 'http://localhost:3000/api/';
  

  selectedIndexIns: number | undefined;

  optionsInstituciones: string[] = []; 
  optionsCoor: string[] = []; 
  convenios: any[] = [];
  idInstituciones: any[] = [];
  idCoor: any[] = [];



  closeDialog() {
    this.dialogRef.close('');
    window.location.reload();

  }
  formulario = {
    id_institucion: '',
    nombre_unidad: '',
  };



  ngOnInit() {
    this.hacerPeticion();

  }

  hacerPeticion() {
    this.http.get(this.url+'nombresInstituciones/').subscribe((data: any) => {
      this.convenios = data;
      console.log(this.convenios,'aqio')
      if (Array.isArray(this.convenios)) {
        for (let i = 0; i < this.convenios.length; i++) {
          this.optionsInstituciones.push(this.convenios[i].Nombre_Institucion)
          this.idInstituciones.push(this.convenios[i].ID_Institucion)
        }
      //console.log( this.optionsInstituciones,'esto')
      }
    });
  }

  /* 
  onOptionSelected() {
    this.optionsCoor = []
    this.idCoor = []
    console.log(this.formulario.nombre_conv)
    this.formulario.id_institucion = this.idInstituciones[this.optionsInstituciones.indexOf(this.formulario.id_institucion)]
    this.http.get(this.url + 'coordinadores/').pipe(
      map((data: any) => {
        this.coordinadores = data;
        if (Array.isArray(this.coordinadores)) {
          for (let i = 0; i < this.coordinadores.length; i++) {
            if (this.coordinadores[i].ID_Institucion == this.formulario.id_institucion) {
              this.optionsCoor.push(String(this.coordinadores[i].Nombre));
              this.idCoor.push(String(this.coordinadores[i].ID_Coordinador));
            }
          }
        }
      })
    ).subscribe();
  }
 */
  addUnidadGestora(formContact: NgForm) {
    if (formContact.valid) {
    this.formulario.id_institucion = String(this.optionsInstituciones.indexOf(this.formulario.id_institucion)+1)
     console.log(this.formulario,'ultimo')
     
      this.http.post('http://localhost:3000/api/unidad_gestora', this.formulario).subscribe(
          (data) => {
            alert('SE HA INGRESADO UNIDAD GESTORA');
            //  window.location.reload();
              console.log(data);
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



  


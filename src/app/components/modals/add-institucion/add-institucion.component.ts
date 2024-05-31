import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddComComponent } from '../add-com/add-com.component';
import { FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ModificarConvenioComponent } from '../modificar-convenio/modificar-convenio.component';

@Component({
  selector: 'app-add-institucion',
  templateUrl: './add-institucion.component.html',
  styleUrls: ['./add-institucion.component.css']
})
export class AddInstitucionComponent {

  constructor(public dialogRef: MatDialogRef<AddComComponent>,private http: HttpClient,private formBuilder: FormBuilder) { }



  formulario = this.formBuilder.group({
    nombreInstitucion: '',
    pais: '',
    alcance: '',
    tipoInstitucion: '',
  })

  inputValue: string = '';



  Ver() {
    console.log('Valor ingresado:', );
    // Aquí puedes realizar la lógica que desees con el valor ingresado
  }

  closeDialog() {
    this.dialogRef.close('');
    window.location.reload();

  }
  enviarFormulario(){
    console.log('Formulario enviado:', this.formulario);
  }


  addConvenio() {
    console.log(this.formulario.value)
     if (this.formulario.value.pais !== 'Chile'){
      this.formulario.value.alcance = 'Internacional'
    }
    else{
      this.formulario.value.alcance = 'Nacional'
    }
    if (this.formulario.valid) {
      console.log(this.formulario.value)
      this.http.post('https://localhost:7230/api/Institucion', this.formulario.value).subscribe(
          (data) => {
            alert('SE A INGRESADO INSTITUCION');
          //  window.location.reload();
            console.log(data);
            window.location.reload();
        
          },
          (error) => {
            alert('ERROR AL INGRESAR INSTITUCIÓN');
            console.error(error);
            window.location.reload();

          }
        );
    } else {
      alert('INGRESO NO VÁLIDO');
    } 
  }
}


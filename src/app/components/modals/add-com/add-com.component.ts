import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-com',
  templateUrl: './add-com.component.html',
  styleUrls: ['./add-com.component.css']
})
export class AddComComponent {

  constructor(private router: Router,private http: HttpClient,public dialog: MatDialog,public dialogRef: MatDialogRef<AddComComponent>) { }
 

  ngOnInit() {
    this.hacerPeticion();
    //console.log(this.options)

  }
 

  options: string[] = []; 
  convenios: any[] = [];
  valorConvenios:string |undefined;
  valorNombre:string |undefined;
  valorConvenio:string |undefined;



  formulario = {
    nombreInst: '',
    coordinadorInstitucion: '',
    nombreConvenio: '',
    tipoDeConvenio: '',
    vigencia: '',
    ano_firma: '',
    documentos: '',
    cupos: ''
  };
  
    enviarFormulario() {
      // Aquí puedes agregar la lógica para enviar el formulario
      // Por ejemplo, puedes hacer una solicitud HTTP para enviar los datos al servidor
      // También puedes agregar validaciones adicionales si es necesario
      console.log('Formulario enviado', this.formulario);
    }
/* 
              <select name="selecConvenio" class="seleccion" [(ngModel)]="formulario.nombre_conv" required>
                <option *ngIf="true" disabled selected value="">Seleccione un convenio</option>
                  <option *ngFor="let convenio of options" [value]="convenio">{{convenio}}</option>
                </select>
                <br>  
                <br>  

                <select name="coordinadorConv" class="seleccion" [(ngModel)]="formulario.coordinadorConv" required>
                  <option *ngIf="true" disabled selected value="">Coordinador de convenios</option>
                  <option *ngFor="let convenio of options" [value]="convenio">{{ convenio }}</option>
                </select>
            
                <div class="orden">
                  <input  name = 'nombreInstitucion' type="text" class="input" [(ngModel)]="formulario.nombreInstitucion" placeholder="Ingresa tu nombre" required>
                  <input type="text" class="input" [(ngModel)]="formulario.tipoDeConvenio" placeholder="Tipo de convenio" required>
                </div>
            
                <div class="orden">
                  <input type="text" class="input" name = 'vigencia' [(ngModel)]="formulario.vigencia" placeholder="Vigencia" required>
                  <input type="text" class="input" [(ngModel)]="formulario.ano_firma" placeholder="Año de Firma" required>
                </div>
            
                <div class="orden">
                  <input type="text" name = 'documentos' class="input" [(ngModel)]="formulario.documentos" placeholder="Documentos" required>
                </div>
            
                <div class="orden">
                  <input type="text" class="input" name = 'cupos' [(ngModel)]="formulario.cupos" placeholder="cupos" required>
                </div>
             */

  addConvenio(formContact: NgForm) {
    if (formContact.valid) {
      alert("SE A INGRESADO EL CONVENIO");
      console.log(this.formulario);
    } else {
      alert("INGRESO NO VALIDO");
    }
  }

  
  closeDialog() {
    this.dialogRef.close('');
  }

  hacerPeticion() {
    const url = 'http://localhost:3000/api/nombresInstituciones/';
    this.http.get(url).subscribe((data: any) => {
      this.convenios = data;
      if (Array.isArray(this.convenios)) {

        for (let i = 0; i < this.convenios.length; i++) {
          //this.options = this.convenios.map(convenio => {return { label: convenio.Nombre_Institucion};});
          console.log(this.convenios[i].Nombre_Institucion, 'aqui')
          this.options.push(this.convenios[i].Nombre_Institucion)
        }
        console.log(this.options)
      }
    });

  }

}




import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modals/modalInfo/modal.component';

@Component({
  selector: 'app-all-convenios',
  templateUrl: './all-convenios.component.html',
  styleUrls: ['./all-convenios.component.css']
})
export class AllConveniosComponent {
  convenios: any[] = []; // Inicialización aquí

  constructor(private http: HttpClient,public dialog: MatDialog) { }

  openModal(Index: number) {
    const dialogRef = this.dialog.open(ModalComponent, {data: { Index:Index }});
  }
  


  ngOnInit() {
    this.hacerPeticion(); 
  }


  hacerPeticion() {
    const url = 'http://localhost:3000/api/convenios';
    this.http.get(url).subscribe((data: any) => {
      this.convenios = data;
    });
  }







}

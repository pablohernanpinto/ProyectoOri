import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  constructor() { }

  private lista1Source = new BehaviorSubject<string[]>([]);
  private lista2Source = new BehaviorSubject<string[]>([]);

  lista1$ = this.lista1Source.asObservable();
  lista2$ = this.lista2Source.asObservable();

  setLista1(lista: string[]) {
    this.lista1Source.next(lista);
  }

  setLista2(lista: string[]) {
    this.lista2Source.next(lista);
  }
}

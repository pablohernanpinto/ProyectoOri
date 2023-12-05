import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  constructor() { }

  private lista1Source = new BehaviorSubject<string[]>([]);
  private lista2Source = new BehaviorSubject<string[]>([]);
  private ImgSource = new BehaviorSubject<string>('');

  lista1$ = this.lista1Source.asObservable();
  lista2$ = this.lista2Source.asObservable();
  img$ = this.ImgSource.asObservable();

  setLista1(lista: string[]) {
    // Vaciar la lista1 antes de asignar la nueva lista
    this.lista1Source.next([]);
    this.lista1Source.next(lista);

  }

  setLista2(lista: string[]) {
    // Vaciar la lista2 antes de asignar la nueva lista
    this.lista2Source.next([]);
    this.lista2Source.next(lista);
  }
  setImg(img: string) {

    this.ImgSource.next(img);

  }
  private busquedaSubject = new Subject<any>();

  // Otros métodos del servicio...

  // Nuevo método para exponer la función busqueda
  public emitBusqueda(data: any) {
    this.busquedaSubject.next(data);
  }

  public getBusquedaObservable() {
    return this.busquedaSubject.asObservable();
  }


}

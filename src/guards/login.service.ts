import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  users: any[] = [];

  session: any;

  constructor(private router: Router,private http: HttpClient) {
    let session: any = localStorage.getItem('session');
    if (session) {
      session = JSON.parse(session);
    }
    this.session = session;
  }

  login(data: Object) {
    if (data) {
      this.session = data;
      localStorage.setItem('session', JSON.stringify(this.session));
      return true; // Devuelve verdadero si el inicio de sesión es exitoso.
    }
    
    return false; // Devuelve falso si las credenciales son incorrectas.
  }

  logout() {
    this.session = undefined;
    localStorage.removeItem('session');
    this.router.navigateByUrl('/login');
  }

  isAuthenticated(): boolean {
    return !!this.session;
  }

  getSession(): any {
    return this.session;
  }

  // Método para verificar el rol del usuario
  getUserRole(): string | undefined {
    
    return this.session ? this.session.PRIVILEGIOS : undefined;
  }
  getUserName():string | undefined {
    return this.session ? this.session.EMAIL : undefined;
  }
  getUserID():string | undefined {

    return this.session ? this.session.ID_USUARIO : undefined;
  }

  
}



import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  users: any[] = [
    {
      email:'cate@gmail.com',
      name: 'Caterinne',
      lastname: 'Avendaño',
      username: 'cate',
      password: 'abc',
      role: 'admin',
    },
    {
      email:'pablo@gmail.com',
      name: 'Pablo',
      lastname: 'Pinto',
      username: 'pablo',
      password: 'cba',
      role: 'user'
    },
  ];
  session: any;
  constructor(private router: Router) {
    let session: any = localStorage.getItem('session');
    if (session) {
      session = JSON.parse(session);
    }
    this.session = session;
  }
  login(username: string, password: string) {
    let user = this.users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      this.session = user;
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
    return this.session ? this.session.role : undefined;
  }
}

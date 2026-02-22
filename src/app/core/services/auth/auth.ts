import {HttpClient} from '@angular/common/http';
import {inject, Injectable, signal} from '@angular/core';
import {Observable, of, tap, throwError} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {User} from '../../models/user.model';
import {LoginRequest} from '../../models/loginRequest';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/users';

  currentUser = signal<User | null>(null);

  constructor() {

    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      try {
        this.currentUser.set(JSON.parse(storedUser));
      } catch (e) {
        this.logout();
      }
    } else {
      this.logout();
    }

  }

  isLoggedIn(): boolean {
    return !!this.currentUser();
  }


  // ========= REGISTER =========

  register(user: User): Observable<User> {
    
    // 1. Check wach l-email deja kayn
    return this.http.get<User[]>(`${this.apiUrl}?email=${user.email}`).pipe(
      switchMap((users) => {
        // Ila lqina user fih had l-email (Tableau 3amer)
        if (users.length > 0) {
          // N-declariw erreur bach tban f Component
          return throwError(() => new Error('Email déjà utilisé !'));
        }

        // 2. Ila kan tableau khawi, daze l-inscription (POST)
        return this.http.post<User>(this.apiUrl, user);
      })
    );
  }


  login(loginRequest: LoginRequest): Observable<User> {
  return this.http.get<User[]>(`${this.apiUrl}?email=${loginRequest.email}`).pipe(
    switchMap((users) => {
      const user = users[0];
      if (!user || loginRequest.password !== user.password) {
        return throwError(() => new Error("Email ou mot de passe incorrect"));
      }
      return of(user);
    }),
    tap((user) => {
      // Create copy without password
      const userSafe = { ...user };
      delete (userSafe as any).password;
      
      localStorage.setItem('user', JSON.stringify(userSafe));
      this.currentUser.set(userSafe as User);
    })
  );
}
  
// Dakhil class AuthService ...

  // 👇 Zidi had l-fonction
  syncUserState(user: User): void {
    // 1. Hyydi l-password (ila kan) bach ma y-mchich l storage
    // (Destructuring: kan-jbdo password buhdo, w userSafe buhdo)
    const { password, ...userSafe } = user;

    // 2. Sajli f LocalStorage (Persistance)
    localStorage.setItem('user', JSON.stringify(userSafe));

    // 3. Jddi l-Signal (Reactivity)
    // Hna fin l-Header kay-siq l-khbar anna s-smiya tbddlat
    this.currentUser.set(userSafe as User);
  }


  logout(): void {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}

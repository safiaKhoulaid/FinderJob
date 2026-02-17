import { Injectable, inject } from "@angular/core";
import { User } from "../../models/user.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private http = inject(HttpClient);
  private urlApi = 'http://localhost:3000/users';


  updateProfile(id: number | string, changes: Partial<User>): Observable<User> {
    
    return this.http.patch<User>(`${this.urlApi}/${id}`, changes);
  }


  deleteUser(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.urlApi}/${id}`);
  }


}
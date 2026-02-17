import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap, of, tap } from 'rxjs';
import { AuthService } from '../auth/auth';
import { Favorite } from '../../models/favoriteJob.model';
import { Job } from '../../models/job.model';

@Injectable({
  providedIn: 'root'
})

export class FavoriteService {

  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'http://localhost:3000/favorites';


  getMyFavorites(): Observable<Favorite[]> {
    const userId = this.authService.currentUser()?.id;
    if (!userId) return of([]); 

    return this.http.get<Favorite[]>(`${this.apiUrl}?userId=${userId}`);
  }


  isFavorite(jobId: string | number): Observable<boolean> {
    const userId = this.authService.currentUser()?.id;
    if (!userId) return of(false);

    return this.http.get<Favorite[]>(`${this.apiUrl}?userId=${userId}&jobId=${jobId}`)
      .pipe(map(favs => favs.length > 0));
  }

  toggleFavorite(job: Job): Observable<any> {
    const userId = this.authService.currentUser()?.id;
    if (!userId) {
      throw new Error('User not logged in');
    }

    return this.http.get<Favorite[]>(`${this.apiUrl}?userId=${userId}&jobId=${job.id}`).pipe(
      switchMap(existingFavs => {
        
        if (existingFavs.length > 0) {
          const favId = existingFavs[0].id;
          return this.http.delete(`${this.apiUrl}/${favId}`).pipe(
            map(() => ({ action: 'removed' }))
          );
        } else {
          const newFav: Favorite = {
            userId: userId,
            jobId: job.id,
            job: job
          };
          return this.http.post(this.apiUrl, newFav).pipe(
            map(() => ({ action: 'added' }))
          );
        }
      })
    );
  }
}
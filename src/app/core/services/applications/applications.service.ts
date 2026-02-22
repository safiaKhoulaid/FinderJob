import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application } from '../../models/application.model';

@Injectable({
    providedIn: 'root'
})
export class ApplicationsService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/applications';

    getApplications(userId?: number | string): Observable<Application[]> {
        let url = this.apiUrl;
        if (userId) {
            url += `?userId=${userId}`;
        }
        return this.http.get<Application[]>(url);
    }

    // Update status
    updateStatus(id: number | string, status: 'pending' | 'accepted' | 'rejected' | 'interview'): Observable<Application> {
        return this.http.patch<Application>(`${this.apiUrl}/${id}`, { status });
    }

    // Update notes
    updateNotes(id: number | string, notes: string): Observable<Application> {
        return this.http.patch<Application>(`${this.apiUrl}/${id}`, { notes });
    }

    // Delete application
    deleteApplication(id: number | string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    // Add application
    addApplication(application: Application): Observable<Application> {
        return this.http.post<Application>(this.apiUrl, application);
    }
}

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SearchFilter } from '../../models/search-filter.model';
import { Job } from '../../models/job.model';

@Injectable({
    providedIn: 'root'
})

export class JobService {

    private http = inject(HttpClient);

    private apiUrl = 'https://www.arbeitnow.com/api/job-board-api';

    searchJobs(filter: SearchFilter): Observable<Job[]> {
        return this.http.get<any>(this.apiUrl).pipe(
            map(response => {
                const jobsData = response.data || [];

                // Map API data to Job model
                const mappedJobs: Job[] = jobsData.map((job: any) => ({
                    id: job.slug,
                    title: job.title,
                    company: job.company_name,
                    location: job.location,
                    description: job.description,
                    url: job.url,
                    date: job.created_at,
                    remote: job.remote,
                    tags: job.tags,
                    jobType: job.job_types,

                    // Derived / Mocked fields for UI compatibility
                    type: job.job_types && job.job_types.length > 0 ? job.job_types[0] : (job.remote ? 'Remote' : 'Full-time'),
                    salary: 'Salaire non spécifié', // API doesn't provide salary
                    logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company_name)}&background=random`, // Placeholder logo
                    region: '', // API doesn't provide region
                    country: 'Remote/International', // Default
                    postedDate: new Date(job.created_at * 1000).toLocaleDateString('fr-FR'),
                    isFavorite: false
                }));

                // Apply filters
                return mappedJobs.filter((job: Job) => {
                    let matches = true;

                    if (filter.keywords) {
                        const title = job.title.toLowerCase();
                        const company = job.company.toLowerCase();
                        const keyword = filter.keywords.toLowerCase();
                        if (!title.includes(keyword) && !company.includes(keyword)) matches = false;
                    }

                    const locationSearch = filter.location || filter.region || filter.country;
                    if (locationSearch && matches) {
                        // Simple check against location string
                        const jobLoc = job.location.toLowerCase();
                        const searchLoc = locationSearch.toLowerCase();
                        if (!jobLoc.includes(searchLoc)) matches = false;
                    }

                    if (filter.jobType && matches) {
                        // Check against our derived 'type' or the original array
                        const filterType = filter.jobType.toLowerCase();
                        const matchesTypeField = job.type?.toLowerCase().includes(filterType);
                        const matchesArray = job.jobType?.some(t => t.toLowerCase().includes(filterType));

                        if (!matchesTypeField && !matchesArray) matches = false;
                    }

                    return matches;
                });
            })
        );
    }
}
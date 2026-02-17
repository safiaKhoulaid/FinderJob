export interface Job {
    id: string | number;
    title: string;
    company: string;
    location: string;
    description: string;
    url?: string;
    date?: number;
    remote?: boolean;
    tags?: string[];
    jobType?: string[];
    // UI fields
    region?: string;
    country?: string;
    salary?: string;
    type?: string;     // Derived from jobType or mocked
    logo?: string;     // Mocked
    isFavorite?: boolean; // UI state
    postedDate?: string; // Formatted date
    requirements?: string[];
    benefits?: string[];
}
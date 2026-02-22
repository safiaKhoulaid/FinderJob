export interface Application {
    id: number | string;
    userId?: number | string;
    jobTitle: string;
    company: string;
    companyLogo: string;
    position: string;
    location: string;
    salary: string;
    status: 'pending' | 'accepted' | 'rejected' | 'interview';
    appliedDate: Date;
    interviewDate?: Date;
    coverLetter: string;
    jobDescription: string;
    requirements: string[];
    notes?: string;
}
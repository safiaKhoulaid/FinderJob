import { Job } from "./job.model";

export interface Favorite {
  id?: string | number; 
  userId: string | number;
  jobId: string | number;
  job: Job; 
}
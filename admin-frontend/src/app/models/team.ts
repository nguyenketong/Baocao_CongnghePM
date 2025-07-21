import { Employee } from './employee';
import { Project } from './project';

export interface Team {
  _id: string;
  teamName: string;
  teamLead: Employee | null;
  projectid: Project | null;
  lastUpdatedBy?: string;
  lastUpdatedAt?: string;
}

// Interface cho dữ liệu update
export interface TeamUpdateData {
  teamName: string;
  teamLead: string;
  projectid: string;
  lastUpdatedBy: string;
  lastUpdatedAt: string;
}

export interface Project {
  _id: string;
  projectName: string;
  projectCategory: {
    _id: string;
    projectCategoryName: string;
  };
  projectImage: string;
  projectStart: string;
  projectEnd: string;
  budget: number;
  priority: string;
  description?: string;
  notificationSent?: string;
  assignedPerson?: string

}
export interface ProjectData {
  projectName: string;
  projectImage: string;
  projectStart: string;
  projectEnd: string;
  budget: number;
  priority: string;
  description?: string;
  projectCategory: string; 
  notificationSent: string; 
  assignedPerson?: string;  
}

export interface ProjectDataEmployee {
  _id: string; // Add this line to include the _id field
  projectName: string;
  projectImage: string;
  projectStart: string;
  projectEnd: string;
  budget?: number;
  priority?: string;
  description?: string;
  notificationSent?: string;
  assignedPerson?: string;
  projectCategory: string | { _id: string; projectCategoryName: string };
}

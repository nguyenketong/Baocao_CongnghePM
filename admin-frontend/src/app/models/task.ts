export interface Task {
    _id: string;
    taskName: string;
    taskStart: string;
    taskEnd: string;
    progressId: { _id:string;progressName: string };
    taskCategory: { taskCategoryName: string };
    notificationSent?: { notification_name: string };
    taskAssignPerson?: { employeeName: string; _id: string,employeeProfile:string };
    taskRecipient?: {employeeName: string; _id: string,employeeProfile:string };
    priority: string;
    description: string;
    status: string;
  }
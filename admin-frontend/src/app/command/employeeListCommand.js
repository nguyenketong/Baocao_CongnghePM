// import axios from "axios";
// import { Employee } from "../models/employee";
// import EmployeeFactory from "../employees/EmployeeFactory";
// import { employeeStore } from "../employees/EmployeeStore";
// export interface Command {
//   execute(): Promise<void> | void;
// }
// // 🟢 Lệnh thêm nhân viên
// export class AddEmployeeCommand implements Command {
//   private newData: Partial<Employee>;
//   private mutate?: (key: string) => Promise<void>;
//   private apiUrl?: string;
//   constructor(newData: Partial<Employee>, mutate?: (key: string) => Promise<void>, apiUrl?: string) {
//     this.newData = newData;
//     this.mutate = mutate;
//     this.apiUrl = apiUrl;
//   }
//   async execute(): Promise<void> {
//     const newEmployee = EmployeeFactory.createEmployee(this.newData);
//     try {
//       await axios.post("http://localhost:3000/employees", newEmployee);
//       employeeStore.fetchEmployees();
//       // Nếu có mutate và apiUrl thì gọi mutate để cập nhật lại danh sách
//       if (this.mutate && this.apiUrl) {
//         await this.mutate(this.apiUrl);
//       }
//     } catch (error) {
//       console.error("Lỗi khi thêm nhân viên:", error);
//     }
//   }
// }
// // 🟢 Lệnh mở dialog
// export class OpenDialogCommand implements Command {
//   private setShowCreateEmployeeDialog: (value: boolean) => void;
//   constructor(setShowCreateEmployeeDialog: (value: boolean) => void) {
//     this.setShowCreateEmployeeDialog = setShowCreateEmployeeDialog;
//   }
//   execute(): void {
//     this.setShowCreateEmployeeDialog(true);
//   }
// }
// // 🟢 Lệnh đóng dialog
// export class CloseDialogCommand implements Command {
//   private setShowCreateEmployeeDialog: (value: boolean) => void;
//   constructor(setShowCreateEmployeeDialog: (value: boolean) => void) {
//     this.setShowCreateEmployeeDialog = setShowCreateEmployeeDialog;
//   }
//   execute(): void {
//     this.setShowCreateEmployeeDialog(false);
//   }
// }

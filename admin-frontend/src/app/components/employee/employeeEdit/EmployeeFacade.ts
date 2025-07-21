import { EmployeeFormData } from '@/app/models/employee';
import { EmployeeCommandFactory } from './EmployeeCommandFactory';


export class EmployeeFacade {
  static async updateEmployee(
    employeeId: string,
    data: EmployeeFormData,
    file: File | null,
    setIsSubmitting: (value: boolean) => void,
    onClose: () => void
  ): Promise<void> {
    const command = EmployeeCommandFactory.createUpdateCommand(employeeId, data, file, setIsSubmitting, onClose);
    await command.execute();
  }
}

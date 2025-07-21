import { EmployeeFormData } from '@/app/models/employee';
import { UpdateEmployeeCommand } from '../../command/employee/UpdateEmployeeCommand';
import { EmployeeSubject } from './EmployeeObserver'; // Import Observer

export class EmployeeCommandFactory {
  static createUpdateCommand(
    employeeId: string,
    data: EmployeeFormData,
    file: File | null,
    setIsSubmitting: (value: boolean) => void,
    onClose: () => void
  ): UpdateEmployeeCommand {
    const observerSubject = new EmployeeSubject(); // Thêm observerSubject
    return new UpdateEmployeeCommand(employeeId, data, file, setIsSubmitting, onClose, observerSubject);
  }
}

// strategy/UpdateEmployeeStrategy.ts
export interface UpdateEmployeeStrategy {
    update(employeeId: string, data: FormData): Promise<void>;
  }
  
  // Cập nhật có ảnh
  import { updateEmployee } from '@/app/services/employeeService';
  
  export class UpdateWithImageStrategy implements UpdateEmployeeStrategy {
    async update(employeeId: string, data: FormData) {
      await updateEmployee(employeeId, data);
    }
  }
  
  // Cập nhật không có ảnh
  export class UpdateWithoutImageStrategy implements UpdateEmployeeStrategy {
    async update(employeeId: string, data: FormData) {
      data.delete('employeeProfile'); // Xóa ảnh nếu không có
      await updateEmployee(employeeId, data);
    }
  }
  
  // Context chọn chiến lược phù hợp
  export class UpdateEmployeeContext {
    private strategy: UpdateEmployeeStrategy;
  
    constructor(strategy: UpdateEmployeeStrategy) {
      this.strategy = strategy;
    }
  
    setStrategy(strategy: UpdateEmployeeStrategy) {
      this.strategy = strategy;
    }
  
    async executeStrategy(employeeId: string, data: FormData) {
      await this.strategy.update(employeeId, data);
    }
  }
  
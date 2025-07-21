export class EmployeeObserver {
    private observers: (() => void)[] = [];
  
    subscribe(observer: () => void) {
      this.observers.push(observer);
    }
  
    notify() {
      this.observers.forEach((observer) => observer());
    }
  }
  
  export const employeeObserver = new EmployeeObserver();
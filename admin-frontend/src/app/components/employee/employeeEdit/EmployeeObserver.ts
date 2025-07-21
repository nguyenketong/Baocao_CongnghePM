// observer/EmployeeObserver.ts
export interface EmployeeObserver {
    update(employeeId: string): void;
  }
  
  export class EmployeeSubject {
    private observers: EmployeeObserver[] = [];
  
    addObserver(observer: EmployeeObserver) {
      this.observers.push(observer);
    }
  
    removeObserver(observer: EmployeeObserver) {
      this.observers = this.observers.filter(obs => obs !== observer);
    }
  
    notifyObservers(employeeId: string) {
      this.observers.forEach(observer => observer.update(employeeId));
    }
  }
  
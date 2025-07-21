// src/observers/EmployeeObserver.ts
class EmployeeObserver {
    private static instance: EmployeeObserver;
    private listeners: (() => void)[] = [];
  
    private constructor() {}
  
    static getInstance(): EmployeeObserver {
      if (!EmployeeObserver.instance) {
        EmployeeObserver.instance = new EmployeeObserver();
      }
      return EmployeeObserver.instance;
    }
  
    subscribe(listener: () => void) {
      this.listeners.push(listener);
    }
  
    unsubscribe(listener: () => void) {
      this.listeners = this.listeners.filter((l) => l !== listener);
    }
  
    notify() {
      this.listeners.forEach((listener) => listener());
    }
  }
  
  export default EmployeeObserver;
  
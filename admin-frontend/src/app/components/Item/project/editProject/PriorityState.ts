/** 🔹 Interface đại diện cho trạng thái Priority */
export interface PriorityState {
    getLabel(): string;
    getClass(): string;
  }
  
  /** 🔹 Các trạng thái cụ thể */
  export class LowPriority implements PriorityState {
    getLabel() {
      return 'Low Priority';
    }
    getClass() {
      return 'bg-green-500 text-white px-3 py-1 rounded-md';
    }
  }
  
  export class MediumPriority implements PriorityState {
    getLabel() {
      return 'Medium Priority';
    }
    getClass() {
      return 'bg-yellow-500 text-white px-3 py-1 rounded-md';
    }
  }
  
  export class HighPriority implements PriorityState {
    getLabel() {
      return 'High Priority';
    }
    getClass() {
      return 'bg-red-500 text-white px-3 py-1 rounded-md';
    }
  }
  
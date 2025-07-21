export interface PriorityState {
  getLabel(): string;
}

export class HighPriority implements PriorityState {
  getLabel(): string {
    return 'Cao 🔥';
  }
}

export class MediumPriority implements PriorityState {
  getLabel(): string {
    return 'Trung bình ⚡';
  }
}

export class LowPriority implements PriorityState {
  getLabel(): string {
    return 'Thấp 🟢';
  }
}

export class PriorityContext {
  private state: PriorityState;

  constructor(initialState: PriorityState) {
    this.state = initialState;
  }

  setState(state: PriorityState) {
    this.state = state;
  }

  getLabel(): string {
    return this.state.getLabel();
  }
}

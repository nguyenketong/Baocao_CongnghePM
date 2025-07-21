export interface StatusState {
    getLabel(): string;
  }
  
  export class NotStarted implements StatusState {
    getLabel(): string {
      return 'Needs Review';
    }
  }
  
  export class InProgress implements StatusState {
    getLabel(): string {
      return 'In Progress';
    }
  }
  
  export class Completed implements StatusState {
    getLabel(): string {
      return 'Completed';
    }
  }
  
  export class StatusContext {
    private state: StatusState;
  
    constructor(initialState: StatusState) {
      this.state = initialState;
    }
  
    setState(state: StatusState) {
      this.state = state;
    }
  
    getLabel(): string {
      return this.state.getLabel();
    }
  }
  
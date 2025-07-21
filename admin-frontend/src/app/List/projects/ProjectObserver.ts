type Listener = () => void;

export class ProjectObserver {
  private listeners: Listener[] = [];

  subscribe(listener: Listener) {
    this.listeners.push(listener);
  }

  unsubscribe(listener: Listener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  notify() {
    this.listeners.forEach((listener) => listener());
  }
}

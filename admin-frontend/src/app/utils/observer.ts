type Observer = (data: any) => void;

class TeamObserver {
  private observers: Observer[] = [];

  subscribe(observer: Observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(data: any) {
    this.observers.forEach((observer) => observer(data));
  }
}

export const teamObserver = new TeamObserver();

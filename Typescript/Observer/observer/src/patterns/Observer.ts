export interface Observer {
  update(data: any): void;
  getId(): string;
}

export abstract class Subject {
  private observers: Observer[] = [];

  public attach(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (isExist) return;
    this.observers.push(observer);
  }

  public detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) return;
    this.observers.splice(observerIndex, 1);
  }

  public notify(data: any): void {
    for (const observer of this.observers) {
      observer.update(data);
    }
  }
}

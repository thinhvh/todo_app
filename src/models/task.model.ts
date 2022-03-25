export class Task {
  id = Math.random();
  title = "";
  isCompleted = false;
  isCheckingComplete = false;
  isEditing = false;

  constructor(init?: Partial<Task>) {
    Object.assign(this, init);
  }
}

export abstract class MockModel<T> {
  protected abstract entityStub: T;

  constructor(createEntityData: T) {
    this.constructorSpy(createEntityData);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  constructorSpy(_createEntityData: T): void {}

  findOne(): { exec: () => T } {
    return {
      exec: (): T => this.entityStub,
    };
  }

  async find(): Promise<T[]> {
    return [this.entityStub];
  }

  async save(): Promise<T> {
    return this.entityStub;
  }

  async findOneAndUpdate(): Promise<T> {
    return this.entityStub;
  }

  async deleteMany(): Promise<{ deletedCount: number }> {
    return {
      deletedCount: 1,
    };
  }

  async deleteOne(): Promise<{ deletedCount: number }> {
    return {
      deletedCount: 1,
    };
  }
}

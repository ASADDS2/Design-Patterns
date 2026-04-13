import { IPC } from "../../types/pc";

export class PCBuilder {
  private pc: Partial<IPC> = {};

  constructor() {
    this.reset();
  }

  reset(): this {
    this.pc = {
      name: "",
      cpu: "",
      gpu: "",
      ram: "",
      storage: ""
    };
    return this;
  }

  setName(name: string): this {
    this.pc.name = name;
    return this;
  }

  setCPU(cpu: string): this {
    this.pc.cpu = cpu;
    return this;
  }

  setGPU(gpu: string): this {
    this.pc.gpu = gpu;
    return this;
  }

  setRAM(ram: string): this {
    this.pc.ram = ram;
    return this;
  }

  setStorage(storage: string): this {
    this.pc.storage = storage;
    return this;
  }

  build(): IPC {

    const result = { ...this.pc } as IPC;
    this.reset();
    return result;
  }
}

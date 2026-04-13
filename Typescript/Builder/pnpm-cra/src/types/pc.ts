export interface IPC {
  id?: number;
  name: string;
  cpu: string;
  gpu: string;
  ram: string;
  storage: string;
  total_price?: string;
}

export type PcType = 'gaming' | 'office' | 'custom';

export interface BuildRequest {
  name: string;
  type: PcType;
}

export const COMPONENTS_OPTIONS = {
  cpu: ["Intel i5-13600K", "Intel i7-14700K", "AMD Ryzen 5 7600X", "AMD Ryzen 9 7950X"],
  gpu: ["NVIDIA RTX 4060", "NVIDIA RTX 4070 Ti", "NVIDIA RTX 4090", "AMD Radeon RX 7900 XTX"],
  ram: ["16GB DDR5", "32GB DDR5", "64GB DDR5"],
  storage: ["1TB NVMe Gen4", "2TB NVMe Gen4", "4TB NVMe Gen4"],
};

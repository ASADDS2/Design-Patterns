from abc import ABC, abstractmethod
from ..models import Computer

class IComputerBuilder(ABC):
    @abstractmethod
    def reset(self): pass
    @abstractmethod
    def set_name(self, name): pass
    @abstractmethod
    def build_cpu(self, model): pass
    @abstractmethod
    def build_gpu(self, model): pass
    @abstractmethod
    def build_ram(self, size): pass
    @abstractmethod
    def build_storage(self, size): pass
    @abstractmethod
    def get_pc_data(self): pass

class GamingBuilder(IComputerBuilder):
    def __init__(self): self.reset()
    def reset(self): self._pc = {}
    def set_name(self, name): self._pc['name'] = name
    def build_cpu(self, model): self._pc['cpu'] = f"Gaming Pro {model}"
    def build_gpu(self, model): self._pc['gpu'] = f"NVIDIA RTX {model}"
    def build_ram(self, size): self._pc['ram'] = f"{size}GB RGB High Speed"
    def build_storage(self, size): self._pc['storage'] = f"{size} NVMe Gen4"
    def get_pc_data(self): return self._pc

class OfficeBuilder(IComputerBuilder):
    def __init__(self): self.reset()
    def reset(self): self._pc = {}
    def set_name(self, name): self._pc['name'] = name
    def build_cpu(self, model): self._pc['cpu'] = f"Efficient {model}"
    def build_gpu(self, model): self._pc['gpu'] = "Integrated Graphics"
    def build_ram(self, size): self._pc['ram'] = f"{size}GB DDR4 Standard"
    def build_storage(self, size): self._pc['storage'] = f"{size} SSD SATA"
    def get_pc_data(self): return self._pc

class PCManager:
    def __init__(self, builder: IComputerBuilder):
        self._builder = builder
    
    def construct_budget_office(self):
        self._builder.reset()
        self._builder.set_name("Office Entry")
        self._builder.build_cpu("i3")
        self._builder.build_ram(8)
        self._builder.build_storage("256GB")
        return self._builder.get_pc_data()

    def construct_high_end_gaming(self):
        self._builder.reset()
        self._builder.set_name("Alpha Gaming")
        self._builder.build_cpu("i9")
        self._builder.build_gpu("4090")
        self._builder.build_ram(32)
        self._builder.build_storage("2TB")
        return self._builder.get_pc_data()

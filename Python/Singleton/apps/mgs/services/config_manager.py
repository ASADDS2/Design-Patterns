import os

from apps.mgs.services.singleton import SingletonMeta


class RestaurantConfigManager(metaclass=SingletonMeta):
    """
    Gestor de configuración global del restaurante.

    Caso de uso: Un sistema de gestión de restaurante necesita
    acceder a parámetros globales (IVA, propina, horario) desde
    múltiples módulos (pedidos, facturación, cocina) sin recargar
    la configuración cada vez. El Singleton garantiza que siempre
    se lea la misma instancia ya cargada en memoria.
    """
    def __init__(self):
        self._config: dict = {
            "nombre_negocio": os.getenv("NEGOCIO_NOMBRE", "Restaurante El Rincón"),
            "iva": float(os.getenv("NEGOCIO_IVA", "0.19")),
            "propina_por_defecto": float(os.getenv("NEGOCIO_PROPINA", "0.10")),
            "moneda": os.getenv("NEGOCIO_MONEDA", "COP"),
            "horario_apertura": os.getenv("NEGOCIO_APERTURA", "08:00"),
            "horario_cierre": os.getenv("NEGOCIO_CIERRE", "22:00"),
            "abierto": True,
        }

    def get(self, key: str):
        return self._config.get(key)

    def set(self, key: str, value) -> None:
        if key not in self._config:
            raise KeyError(f"La clave '{key}' no existe en la configuración.")
        self._config[key] = value

    def get_all(self) -> dict:
        return dict(self._config)

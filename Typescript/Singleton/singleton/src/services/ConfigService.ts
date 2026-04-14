import { RestaurantConfig } from '../types/config.types';

/**
 * ConfigService — Singleton en TypeScript
 *
 * Patrón: Constructor privado + instancia estática.
 * Garantiza que en toda la aplicación siempre se use
 * el mismo objeto para leer y modificar la configuración global.
 */
class ConfigService {
  private static instance: ConfigService | null = null;

  private config: RestaurantConfig = {
    nombre_negocio: '',
    iva: 0,
    propina_por_defecto: 0,
    moneda: 'COP',
    horario_apertura: '',
    horario_cierre: '',
    abierto: false,
  };

  private readonly instanceId: number = Math.floor(Math.random() * 999_999);

  private constructor() {}

  static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService();
    }
    return ConfigService.instance;
  }

  getInstanceId(): number {
    return this.instanceId;
  }

  setConfig(config: RestaurantConfig): void {
    this.config = { ...config };
  }

  getConfig(): RestaurantConfig {
    return { ...this.config };
  }

  updateField(key: keyof RestaurantConfig, value: RestaurantConfig[keyof RestaurantConfig]): void {
    this.config = { ...this.config, [key]: value };
  }

  isOpen(): boolean {
    return this.config.abierto;
  }
}

export default ConfigService;

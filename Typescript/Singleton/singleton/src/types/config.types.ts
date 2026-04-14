export interface RestaurantConfig {
  nombre_negocio: string;
  iva: number;
  propina_por_defecto: number;
  moneda: string;
  horario_apertura: string;
  horario_cierre: string;
  abierto: boolean;
}

export interface ConfigResponse {
  instance_id: number;
  config: RestaurantConfig;
}

export interface UpdateConfigPayload {
  key: keyof RestaurantConfig;
  value: string | number | boolean;
}

export interface ChangeLogEntry {
  id: number;
  key: string;
  old_value: string;
  new_value: string;
  changed_at: string;
}

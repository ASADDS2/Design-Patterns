export interface HomeState {
  id?: number;
  last_action: string;
  activated_at: string;
  details: string[];
}

export interface FacadeResponse {
  action: string;
  details: string[];
}

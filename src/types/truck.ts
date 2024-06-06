export enum TruckStatus {
  OUT_OF_SERVICE = 'Out Of Service',
  LOADING = 'Loading',
  TO_JOB = 'To Job',
  AT_JOB = 'At Job',
  RETURNING = 'Returning'
}

export interface Truck {
  id?: number
  code: string
  name: string
  status: TruckStatus | string
  description?: string
}

export enum TruckFormActions {
  CREATE = 'create',
  UPDATE = 'update'
}

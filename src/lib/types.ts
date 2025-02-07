export interface HabitCategory {
  id: number;
  name: string;
}

export enum HabitPeriod {
  daily = 'daily',
  weekly = 'weekly',
  monthly = 'monthly',
}

export enum HabitType {
  state = 'state',
  number = 'number',
}

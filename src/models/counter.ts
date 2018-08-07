export interface ICounter {
  changed: boolean;
  name: string;
  uid: string;
  value: number;
}

export const createCounter = (uid: number, value: number): ICounter => ({
  changed: false,
  name: `Счетчик #${uid}`,
  uid: `${uid}`,
  value: Math.round(value * 100) / 100
});

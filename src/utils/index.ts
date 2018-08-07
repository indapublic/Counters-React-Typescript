import { ICounter } from "../models/counter";

const border = 10000;
const step = 1;

export const recalcArray = (counters: ICounter[]): ICounter[] => {
  if (counters.length < 2) {
    return counters;
  }
  const total: number = counters.reduce(
    (prevValue: number, counter: any): any => prevValue + counter.value,
    0
  );
  switch (true) {
    case total === border:
      return counters;
    case total > border:
      const maxCounter = counters
        .filter((c: ICounter) => !c.changed)
        .reduce(
          (prevCounter: ICounter, curCounter: ICounter): ICounter =>
            prevCounter.value > curCounter.value && !curCounter.changed
              ? prevCounter
              : curCounter
        );
      return recalcArray(
        counters.map(
          (c: ICounter): ICounter => {
            if (c.changed) {
              return c;
            }
            if (c.uid === maxCounter.uid) {
              return {
                ...c,
                value: c.value - step
              };
            }
            return c;
          }
        )
      );
    case total < border:
      const minCounter = counters
        .filter((c: ICounter) => !c.changed)
        .reduce(
          (prevCounter: ICounter, curCounter: ICounter): ICounter =>
            prevCounter.value < curCounter.value ? prevCounter : curCounter
        );
      return recalcArray(
        counters.map(
          (c: ICounter): ICounter => {
            if (c.changed) {
              return c;
            }
            if (c.uid === minCounter.uid) {
              return {
                ...c,
                value: c.value + step
              };
            }
            return c;
          }
        )
      );
    default:
      return counters;
  }
};

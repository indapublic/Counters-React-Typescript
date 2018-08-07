import { createCounter, ICounter } from "../models/counter";

export const load = (length: number): ICounter[] => {
  const result = new Array(length);
  return result
    .fill(null, 0, length)
    .map((v: never, counterIndex: number) =>
      createCounter(counterIndex + 1, Math.round(10000 / length))
    );
};

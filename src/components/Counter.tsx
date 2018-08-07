import * as React from "react";

import { ICounter } from "../models/counter";

interface ICounterProps {
  counter: ICounter;
  onChange: (counter: ICounter) => void;
  onRemove: (counter: ICounter) => void;
}

export default class Counter extends React.Component<ICounterProps> {
  public render() {
    const {
      props: { counter, onChange, onRemove }
    } = this;
    return (
      <div>
        <label>
          {counter.name}
          <input
            type="range"
            min={0}
            max={100}
            step={0.01}
            value={counter.value / 100}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
              ev.preventDefault();
              onChange({
                ...counter,
                value: Math.round(parseInt(ev.target.value, 10) * 100)
              });
            }}
          />
          <input
            type="number"
            min={0}
            max={100}
            step={0.01}
            value={counter.value / 100}
            onKeyPress={(ev: React.KeyboardEvent<HTMLInputElement>) => {
              if (ev.keyCode === 46 || ev.charCode === 46) {
                const target = ev.target as HTMLInputElement;
                if (target.value.indexOf(".") === -1) {
                  target.value = target.value + ".0";
                }
                ev.preventDefault();
              }
            }}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
              const value = Math.round(
                (Math.round(parseFloat(ev.target.value) * 100) / 100) * 100
              );
              onChange({
                ...counter,
                value: isNaN(value) ? counter.value : value
              });
            }}
          />
          <button
            onClick={(ev: React.MouseEvent<HTMLButtonElement>) => {
              ev.preventDefault();
              onRemove(counter);
            }}
          >
            Удалить
          </button>
        </label>
      </div>
    );
  }
}

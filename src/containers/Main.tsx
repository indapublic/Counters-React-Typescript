import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import * as mainActions from "../actions/main";
import Counter from "../components/Counter";
import { ICounter } from "../models/counter";
import { IState as IMainState } from "../reducers/main";

interface IMainProps {
  main: IMainState;
  mainActions: {
    loadCounters: () => void;
    setRandomData: () => void;
    setCounter: (counter: ICounter) => void;
    removeCounter: (counter: ICounter) => void;
    setLength: (arrayLength: number) => void;
  };
}

class Main extends React.Component<IMainProps, IMainState> {
  public componentWillMount() {
    const {
      mainActions: { loadCounters }
    } = this.props;
    loadCounters();
  }

  public render() {
    const {
      main: { counters, arrayLength },
      mainActions: { setRandomData, setCounter, removeCounter, setLength }
    } = this.props;
    return (
      <div>
        <button
          onClick={(ev: React.MouseEvent<HTMLButtonElement>) => {
            ev.preventDefault();
            setRandomData();
          }}
        >
          Загрузить
        </button>
        <input
          type="number"
          min={0}
          max={100}
          step={1}
          value={arrayLength}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
            ev.preventDefault();
            setLength(parseInt(ev.target.value, 10));
          }}
        />
        <label>значений</label>
        {counters.map((counter: ICounter) => (
          <Counter
            key={counter.uid}
            counter={counter}
            onChange={setCounter}
            onRemove={removeCounter}
          />
        ))}
      </div>
    );
  }
}

export default connect(
  (state: any) => ({
    main: state.main
  }),
  (dispatch: Dispatch) => ({
    mainActions: bindActionCreators(mainActions, dispatch)
  })
)(Main);

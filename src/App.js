import React from 'react';
import apis from './mockApis';

class App extends React.Component {
  state = {
    counters: [0],
  };

  async componentDidMount() {
    const response = await apis.fetchCounterValue();
    const counterCount = this.state.counters.length;
    const counterArray = new Array(counterCount);
    counterArray.fill(response.data.initial);

    this.setState({ counters: counterArray });
  }

  changeCounterValue(by) {
    const currentCounter = this.state.counters;
    const updatedCounter = currentCounter.map(count => count + by);

    this.setState({ counters: updatedCounter });
  }

  setRandomCounterValue() {
    const updatedCounter = this.state.counters.map(() => {
      const sign = Math.random() < 0.5 ? -1 : 1;
      const randomNumber = Math.floor(500 * Math.random());
      return sign * randomNumber;
    });

    this.setState({ counters: updatedCounter });
  }

  async addCounter() {
    const currentCounters = this.state.counters;

    this.setState({ counters: [...currentCounters, 0] }, async () => {
      const counters = this.state.counters;
      const response = await apis.fetchCounterValue();
      counters[counters.length - 1] = response.data.initial;

      this.setState({ counters: counters });
    });
  }

  render() {
    const { counters } = this.state;

    return (
      <>
        {counters.map((counter, index) => (
          <h1 key={index}>{counter}</h1>
        ))}
        <button type="button" onClick={() => this.changeCounterValue(1)}>
          Increment
        </button>
        <button type="button" onClick={() => this.changeCounterValue(-1)}>
          Decrement
        </button>
        <button type="button" onClick={() => this.setRandomCounterValue()}>
          Randomize
        </button>
        <button type="button" onClick={() => this.addCounter()}>
          Add Counter
        </button>
      </>
    );
  }
}

export default App;

import React from 'react';

class App extends React.Component {
  state = {
    counter: 0,
  };

  changeCounterValue(by) {
    const currentValue = this.state.counter;
    this.setState({ counter: currentValue + by });
  }

  render() {
    const { counter } = this.state;

    return (
      <>
        <h1>{counter}</h1>
        <button type="button" onClick={() => this.changeCounterValue(1)}>Increment</button>
        <button type="button" onClick={() => this.changeCounterValue(-1)}>Decrement</button>
      </>
    );
  }
}

export default App;

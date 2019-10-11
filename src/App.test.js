import React from 'react';
import App from './App';
import { shallow } from 'enzyme';
import apis from './mockApis';

describe('<App />', () => {
  let wrapper;

  beforeAll(() => {
    apis.fetchCounterValue = jest.fn().mockReturnValue(
      Promise.resolve({
        status: 200,
        data: {
          initial: 50,
        },
      }),
    );
  });

  afterAll(() => {
    apis.fetchCounterValue.mockClear();
  })

  beforeEach(() => {
    wrapper = shallow(<App />, { disableLifecycleMethods: true });
  });

  it('should render a counter value as <h1 /> HTML tag', () => {
    expect(wrapper.find('h1')).toHaveLength(1);
  });

  it('should render a counter with initial value 0 before API call', () => {
    expect(wrapper.find('h1').text()).toEqual('0');
  });

  it('should render two buttons - Increment and Decrement', () => {
    const buttons = wrapper.find('button').map(button => button.text());
    expect(buttons).toHaveLength(2);
    expect(buttons).toContain('Increment');
    expect(buttons).toContain('Decrement');
  });

  it('should render Increment button that should increment the value of counter by 1', () => {
    expect(wrapper.find('h1').text()).toBe('0');
    const incrementButton = wrapper.find('button').at(0);
    incrementButton.simulate('click');
    expect(wrapper.find('h1').text()).toBe('1');
  });

  it('should render Decrement button that should decrement the value of counter by 1', () => {
    expect(wrapper.find('h1').text()).toBe('0');
    const decrementButton = wrapper.find('button').at(1);
    decrementButton.simulate('click');
    expect(wrapper.find('h1').text()).toBe('-1');
  });

  it('should update the counter value with data fetched from API', done => {
    const spyDidMount = jest.spyOn(App.prototype, 'componentDidMount');
    expect(spyDidMount).not.toHaveBeenCalled();
    const didMount = wrapper.instance().componentDidMount();
    expect(spyDidMount).toHaveBeenCalled();
    didMount.then(() => {
      expect(wrapper.update().state().counter).toBe(50);
      done();
    });
  });
});

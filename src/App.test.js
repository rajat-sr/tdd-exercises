import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

describe('<App />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should render a counter value as <h1 /> HTML tag', () => {
    expect(wrapper.find('h1')).toHaveLength(1);
  });

  it('should render a counter with initial value 0', () => {
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
});

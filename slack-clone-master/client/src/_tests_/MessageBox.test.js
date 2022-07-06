import React from 'react';
import {shallow} from 'enzyme';
import MessageBox from '../components/MessageBox';
require('../setupTests');

describe('check if value of input matches the state', () => {
  it('should have same value as state when state has non empty message', () => {
    const wrapper = shallow(<MessageBox />);
    const testMessage = "testMessage";
    wrapper.setState({
      message: testMessage
    })
    expect(wrapper.find('FormControl').props().value).toBe(testMessage);
  });

  it('should have empty value if state is empty', () => {
    const wrapper = shallow(<MessageBox />);
    const testMessage = "";
    wrapper.setState({
      message: testMessage
    })
    expect(wrapper.find('FormControl').props().value).toBe('');
  });
});

describe('check if button is disabled depending on state', () => {
  it('should be disabled if state is empty', () => {
    const wrapper = shallow(<MessageBox />);
    const testMessage = "";
    wrapper.setState({
      message: testMessage
    })
    expect(wrapper.find('FormControl').props().value).toBe('');
    expect(wrapper.find('Button').props().disabled).toBe(true);
  });

  it('should be enbaled if state has message', () => {
    const wrapper = shallow(<MessageBox />);
    const testMessage = "testMessage";
    wrapper.setState({
      message: testMessage
    })
    expect(wrapper.find('FormControl').props().value).toBe(testMessage);
    expect(wrapper.find('Button').props().disabled).toBe(false);
  });
});

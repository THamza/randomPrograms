import React from 'react';
import {shallow} from 'enzyme';
import AddChannelForm from '../components/AddChannelForm';
require('../setupTests');

describe('Check if create button is rendered', () => {
  it('renders create button without crashing', () => {
    const wrapper = shallow(<AddChannelForm />);
    expect(wrapper.find('Button').text()).toBe('Create Channel');
  });
});

describe('checking value of input matches state', () => {
  it('should return same value of input as state', () => {
    const wrapper = shallow(<AddChannelForm />);
    const channelname = 'Testing';
    wrapper.setState({
      channelName: channelname
    })
    expect(wrapper.find('input').props().value).toBe(channelname);
    expect(wrapper.find('input').props().placeholder).toBe('Enter Channel Name');
  });
});

describe('Check if addChannel button is disabled', () => {
  it('should be disabled if input is empty', () => {
    const wrapper = shallow(<AddChannelForm />);
    const channelname = '';
    wrapper.setState({
      channelName: channelname
    })
    expect(wrapper.find('Button').props().disabled).toBe(true);
  });
});


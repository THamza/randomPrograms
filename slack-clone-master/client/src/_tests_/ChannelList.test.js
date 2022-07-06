import React from 'react';
import {shallow} from 'enzyme';
import ChannelList from '../components/ChannelList';
require('../setupTests');

describe('ChannelList component should render spinner', () => {
  let channels = [];
  let isLoadingChannels = false;
  let selectChannel = null;

  it('renders spinner when channels are loading', () => {
    isLoadingChannels = true;
    const wrapper = shallow(<ChannelList channels={channels} isLoadingChannels={isLoadingChannels} selectChannel={selectChannel} />);
    expect(wrapper.find('ul').children().length).toBe(0);
  });
});

describe('Check if correct number of channels render', () => {
  let channels = [];
  let isLoadingChannels = false;
  let selectChannel = null;


  it('renders 1 channel', () => {
    isLoadingChannels = true;
    channels = [{name: "channelTest", id: "11222"}];
    const wrapper = shallow(<ChannelList channels={channels} isLoadingChannels={isLoadingChannels} selectChannel={selectChannel} />);
    expect(wrapper.find('ul').children().length).toBe(1);
  });

  it('renders 2 or more channels', () => {
    isLoadingChannels = true;
    channels = [{name: "channel1", id: "111"}, {name: "channel2", id: "222"}];
    const wrapper = shallow(<ChannelList channels={channels} isLoadingChannels={isLoadingChannels} selectChannel={selectChannel} />);
    expect(wrapper.find('ul').children().length).toBe(2);
    expect(wrapper.find('ul').childAt(0).find('Button').text()).toBe("channel1");
    expect(wrapper.find('ul').childAt(1).find('Button').text()).toBe("channel2");
  });
});

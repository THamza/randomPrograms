import React from 'react';
import {shallow} from 'enzyme';
import ChatRoom from '../components/ChatRoom';
require('../setupTests');

describe('Check if name is correctly dispaying', () => {
  const channel = {name: "name"};
  it('should render the channel name if not null', () => {
    const wrapper = shallow(<ChatRoom channel={channel} />);
    expect(wrapper.find('h2').text()).toBe(channel.name);
  });
});

describe('Check if messageList component is rendered', () => {
  const channel = {name: "name"};
  const messages = [{message: "message"}]
  it('should render the messageList with any messages passed to it', () => {
    const wrapper = shallow(<ChatRoom channel={channel} messages={messages} />);
    expect(wrapper.find('MessageList').text()).toBe('<MessageList />');
    expect(wrapper.find('MessageList').props().messages).toBe(messages);
  });
});

describe('Check if UserList component is rendered', () => {
  const channel = {name: "name"};
  const users = [{name: "test"}]
  it('should render the userList with a user passed to it', () => {
    const wrapper = shallow(<ChatRoom channel={channel} users={users} />);
    expect(wrapper.find('UserList').text()).toBe('<UserList />');
    expect(wrapper.find('UserList').props().users).toBe(users);
  });
});

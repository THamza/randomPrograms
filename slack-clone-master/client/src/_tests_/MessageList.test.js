import React from 'react';
import {shallow} from 'enzyme';
import MessageList from '../components/MessageList';
require('../setupTests');

describe('MessageList component should render messages', () => {
  it('renders messageList with no messages displayed', () => {
    const messages = [];
    const wrapper = shallow(<MessageList messages={messages} />);
    const message = wrapper.find('div').text();
    expect(message).toBe("no messages");
  });

  it('renders messageList with 1 message displayed', () => {
    const messages = [{senderId: 111, parts: [{payload: {content: "hello"}}]}];
    const wrapper = shallow(<MessageList messages={messages} />);
    const message = wrapper.find('div div div').text();
    expect(message).toBe(`${messages[0].senderId}: ${messages[0].parts[0].payload.content}`);
  });

  it('renders messageList with multiple messages displayed', () => {
    const messages = [
      {senderId: 111, parts: [{payload: {content: "message1"}}]},
      {senderId: 222, parts: [{payload: {content: "message2"}}]}
    ];
    const wrapper = shallow(<MessageList messages={messages} />);
    const message1 = wrapper.find('div div div').getElements()[0].props.children;
    const message2 = wrapper.find('div div div').getElements()[1].props.children;
    expect(message1).toBe(`${messages[0].senderId}: ${messages[0].parts[0].payload.content}`);
    expect(message2).toBe(`${messages[1].senderId}: ${messages[1].parts[0].payload.content}`);
  });

});

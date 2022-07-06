import React from 'react';
import {shallow} from 'enzyme';
import UserList from '../components/UserList';
require('../setupTests');

describe('Check if user List renders with appropriate user names', () => {
  it('should render nothing if no users are passed', () => {
    const users = [];
    const wrapper = shallow(<UserList users={users} />);
    expect(wrapper.find("div").children().length).toBe(1);
  });

  it('should render 1 user when 1 is passed to it and display appropriate info', () => {
    const users = [{name: "test", presence: {state: "online"}}];
    const wrapper = shallow(<UserList users={users} />);
    expect(wrapper.find("div div h3").at(0).props().children).toBe(`Users in this Channel:`);
    expect(wrapper.find("div div").at(1).props().children).toBe(`${users[0].name} (${users[0].presence.state})`);
  });

});

describe('Check if user List renders with appropriate users status', () => {
  it('should render online', () => {
    const users = [{name: "test", presence: {state: "online"}}];
    const wrapper = shallow(<UserList users={users} />);
    expect(wrapper.find("div div h3").at(0).props().children).toBe(`Users in this Channel:`);
    expect(wrapper.find("div div").at(1).props().children).toBe(`${users[0].name} (online)`);
  });

  it('should render offline', () => {
    const users = [{name: "test", presence: {state: "offline"}}];
    const wrapper = shallow(<UserList users={users} />);
    expect(wrapper.find("div div h3").at(0).props().children).toBe(`Users in this Channel:`);
    expect(wrapper.find("div div").at(1).props().children).toBe(`${users[0].name} (offline)`);
  })
});



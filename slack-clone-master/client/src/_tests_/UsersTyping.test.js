import React from 'react';
import {shallow} from 'enzyme';
import UsersTyping from '../components/UsersTyping';
require('../setupTests');

describe('check outputs depending on properties passed to it', () => {
  it('should render empty <p> if no users are passed to class', () => {
    const users = [];
    const wrapper = shallow(<UsersTyping usersTyping={users} />);
    expect(wrapper.find('p').text()).toBe('');
  });

  it('should render User is typing if only one user is typing', () => {
    const testName = 'testName'
    const users = [testName];
    const wrapper = shallow(<UsersTyping usersTyping={users} />);
    expect(wrapper.find('div').text()).toBe(`${users[0]} is typing...`);
  });

  it('should render User1, User2 are typing... more than one user is typing', () => {
    const testName1 = 'testName1'
    const testName2 = 'testName2'
    const users = [testName1, testName2];
    const wrapper = shallow(<UsersTyping usersTyping={users} />);
    expect(wrapper.find('div').text()).toBe(`${users[0]}, ${users[1]} are typing...`);
  });
});

import React from 'react';
import {shallow} from 'enzyme';
import Login from '../components/Login';
require('../setupTests');

describe('Login component should render', () => {
  it('renders Login without crashing', () => {
   const wrapper = shallow(<Login />);
    expect(wrapper.find('div h3').text()).toBe("Log In");
  });
});

describe('check if signup page is shown when hyperlink on loginpage is clicked',() => {
  it('signup page shown when hyperlink on login page is clicked',() =>{
    const wrapper= shallow(<Login />);
    wrapper.setState({loginPage:true});
    wrapper.setState({signUpPage:false});
    wrapper.find('#signup1').simulate('click', {
      preventDefault: () => {
      }
    });
    expect(wrapper.state('signUpPage')).toEqual(true);
    expect(wrapper.state('loginPage')).toEqual(false);
    expect(wrapper.find('h3 strong').text()).toBe("Sign Up")


  })
});

describe('check if login page is shown when hyperlink on signup page is clicked',() => {
  it('login page shown when hyperlink on signup page is clicked',() =>{
    const wrapper= shallow(<Login />);
    wrapper.setState({signUpPage:true});
    wrapper.setState({loginPage:false});

    wrapper.find('#log1').simulate('click', {
      preventDefault: () => {
      }
    });
    expect(wrapper.state('signUpPage')).toEqual(false);
    expect(wrapper.state('loginPage')).toEqual(true);
    expect(wrapper.find('h3 strong').text()).toBe("Log In")





  })
});


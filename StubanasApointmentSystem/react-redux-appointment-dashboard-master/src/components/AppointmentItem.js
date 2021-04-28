import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

class AppointmentItem extends Component {

  render() {

    let statusClass = this.props.available ? 'active' : 'booked';
    let name = this.props.name ? this.props.name : 'Open'
    let phone = this.props.phone ? ` | ${this.props.phone}` : ''

    return (
      <div className={statusClass}>
          <Divider />
          <ListItem button>
            <ListItemText primary={this.props.time} secondary=""/>
            {name} {phone}
          </ListItem>
          <Divider />
      </div>
    );
    }
}

export default AppointmentItem;
